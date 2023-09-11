import { Platform } from 'src/services/platform';
import { enrollBiometric } from 'src/services/driver/commands/biometricScripts';
import changeMobileSettings from 'src/app/web/modules/Settings/api/services/changeMobileSettings';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import AuthActions from 'src/app/mobile/actions/authActions';
import { openMore } from 'src/app/mobile/actions/mainActions';
import env from 'src/services/environment';
import MorePage from 'src/app/mobile/content/modules/More/pages/morePage';
import SettingsPage, {
    SETTINGS_MENU_ITEMS,
} from 'src/app/mobile/content/modules/Settings/pages/settingsPage';
import { expect } from 'chai';
import { setUpPin } from 'src/app/mobile/actions/settingsActions';
import { fingerPrint } from 'src/services/driver/driverActions';
import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import { LOGIN_ICON_TYPES } from 'src/app/mobile/content/modules/Authentication/LoginSettings/constants';
import Main from 'src/app/mobile/content/core/pages/main';
import milliseconds from 'src/utils/milliseconds';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

const FINGER_PRINT_ID = {
    CORRECT: 1,
    INCORRECT: 2,
};

if (!Platform.isIOS) {
    // TODO: have to check is it works
    describe('Login/Logout using biometric', async () => {
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

        it('Set up biometric and logout', async () => {
            await SettingsPage.tap(SETTINGS_MENU_ITEMS.USE_BIOMETRIC.ITEM);
            await setUpPin();
            await SettingsPage.tap(SETTINGS_MENU_ITEMS.USE_BIOMETRIC.ITEM);

            await fingerPrint(FINGER_PRINT_ID.CORRECT);

            await SettingsPage.logOut();
        });

        it('Login with incorrect finger print', async () => {
            await LoginPage.tapLoginIcon(LOGIN_ICON_TYPES.FINGERPRINT);
            await fingerPrint(FINGER_PRINT_ID.INCORRECT);
            expect(await Main.isPlusButtonDisplayed({ timeout: milliseconds.seconds(2) })).to.be
                .false;
        });

        it('Login with correct finger print', async () => {
            await LoginPage.tapLoginIcon(LOGIN_ICON_TYPES.FINGERPRINT);
            await fingerPrint(FINGER_PRINT_ID.CORRECT);
            expect(await Main.isPlusButtonDisplayed({ timeout: milliseconds.seconds(2) })).to.be
                .true;
        });
    });
}
