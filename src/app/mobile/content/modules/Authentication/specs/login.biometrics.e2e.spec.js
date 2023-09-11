import description from 'src/services/reporting/description';
import AuthActions from 'src/app/mobile/actions/authActions';
import { openMore } from 'src/app/mobile/actions/mainActions';
import MorePage from 'src/app/mobile/content/modules/More/pages/morePage';
import env from 'src/services/environment';
import SettingsPage, {
    SETTINGS_MENU_ITEMS,
} from 'src/app/mobile/content/modules/Settings/pages/settingsPage';
import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import { LOGIN_ICON_TYPES } from 'src/app/mobile/content/modules/Authentication/LoginSettings/constants';
import element from 'src/element';
import { BIOMETRIC_TYPES } from 'src/services/driver/biometricTypes';
import { expect } from 'chai';
import Main from 'src/app/mobile/content/core/pages/main';
import { enrollBiometric, sendBiometricMatch } from 'src/services/driver/commands/biometricScripts';
import { setUpPin } from 'src/app/mobile/actions/settingsActions';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';
import milliseconds from 'src/utils/milliseconds';
import changeMobileSettings from 'src/app/web/modules/Settings/api/services/changeMobileSettings';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

const BIOMETRIC_TYPE = BIOMETRIC_TYPES.FACE_ID;
const BIOMETRIC_ARGS_MATCH = { type: BIOMETRIC_TYPE, match: true };

// TODO: Biometrics stopped to be enrolled
(driver.isIOS ? describe.skip : describe.skip)(
    description.applyEnv('Touch/Face Id set up and validation'),
    async () => {
        before(async () => {
            await enrollBiometric({ isEnabled: true });
            await changeMobileSettings(await authorize(ENV_URL, USER));
            await AuthActions.skipOnboardingScreens();
            await AuthActions.loginToApplication(USER);
            await openMore();
        });

        it("'PIN code' switcher is turned off by default", async () => {
            await MorePage.settings();
            const biometricSwitcher = await SettingsPage.useBiometrics();
            const pinCodeSwitcher = await SettingsPage.getUsePinCode();
            expect(await biometricSwitcher.isElementDisplayed()).to.be.true;
            expect(await pinCodeSwitcher.isElementDisplayed()).to.be.true;
        });

        it('Face/Touch Id is set up', async () => {
            await SettingsPage.tap(SETTINGS_MENU_ITEMS.USE_BIOMETRIC.ITEM);
            await setUpPin();
            await SettingsPage.tap(SETTINGS_MENU_ITEMS.USE_BIOMETRIC.ITEM);

            await waitForFaceIDScreen();

            await sendBiometricMatch(BIOMETRIC_ARGS_MATCH);
            await SettingsPage.waitForOpened();

            const biometricSwitcher = await SettingsPage.useBiometrics({
                hasBiometric: true,
                isDisabled: false,
            });
            const pinCodeSwitcher = await SettingsPage.getUsePinCode({
                hasPin: true,
                isDisabled: false,
            });
            expect(await biometricSwitcher.isElementDisplayed()).to.be.true;
            expect(await pinCodeSwitcher.isElementDisplayed()).to.be.true;
        });

        it('Login with incorrect Face ID', async () => {
            await SettingsPage.logOut();
            await LoginPage.tapLoginIcon(LOGIN_ICON_TYPES.FACE_ID);
            await sendBiometricMatch({ type: BIOMETRIC_TYPE, match: false });
            expect(await Main.isPlusButtonDisplayed({ timeout: milliseconds.seconds(2) })).to.be
                .false;
        });

        it('Login with correct Face ID', async () => {
            await NativeAlert.pressButton('Cancel');
            await LoginPage.tapLoginIcon(LOGIN_ICON_TYPES.FACE_ID);
            await sendBiometricMatch(BIOMETRIC_ARGS_MATCH);
            expect(await Main.isPlusButtonDisplayed()).to.be.true;
        });

        const waitForFaceIDScreen = async () => {
            await driver.waitUntil(() =>
                element({
                    ios: '-ios class chain:**/XCUIElementTypeStaticText[`label == "Face ID"`]',
                }).isElementDisplayed()
            );
        };
    }
);
