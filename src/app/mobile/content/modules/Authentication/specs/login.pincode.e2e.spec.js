import { expect } from 'chai';

require('dotenv').config();
import AuthActions from 'src/app/mobile/actions/authActions';
import env from 'src/services/environment';
import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import {
    RepeatPinPage,
    SetPinPage,
} from 'src/app/mobile/content/modules/Settings/components/pinCodePage';
import SettingsPage, {
    SETTINGS_MENU_ITEMS,
} from 'src/app/mobile/content/modules/Settings/pages/settingsPage';
import description from 'src/services/reporting/description';
import PIN_CODES from 'src/app/mobile/content/modules/Authentication/specs/testData/pinCodes';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import {
    cookAuthenticationSettings,
} from 'src/app/web/modules/Settings/api/mobileSettingsConfig/cookAuthenticationSettings';
import changeMobileSettings from 'src/app/web/modules/Settings/api/services/changeMobileSettings';
import { LOGIN_ICON_TYPES } from 'src/app/mobile/content/modules/Authentication/LoginSettings/constants';
import { navigateToSettings } from 'src/app/mobile/actions/mainActions';
import { addStep } from 'src/services/reporting/allure';
import SETTINGS_ERROR_MESSAGES from 'src/app/mobile/content/modules/Settings/constants/settingsErrorMessages';
import ERROR_MESSAGES from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/constants/errorMessages';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

const { SAME_NUMBER, INVALID, VALID, SEQUENTIAL } = PIN_CODES;

const waitSetPinPage = () => SetPinPage.waitForOpened();
const waitSettingsPage = () => SettingsPage.waitForOpened();

//DEVNOTE: autoacceptAlerts is used for ios, so we accept alerts manually only for Android
describe(description.applyEnv('Pin code set up and validation'), async () => {
    before('Navigate to Login Screen', async () => {
        const restClient = await authorize(ENV_URL, USER);
        await changeMobileSettings(restClient, cookAuthenticationSettings());
        await AuthActions.skipOnboardingScreens();
    });

    it('Setting Page should be opened when "Cancel" clicked', async () => {
        await AuthActions.loginToApplication(USER);
        await navigateToSettings();

        await SettingsPage.tap(SETTINGS_MENU_ITEMS.USE_PIN_CODE).then(waitSetPinPage);
        await SetPinPage.tapCancel().then(waitSettingsPage);
    });

    it('No pins may be all the same number should be displayed', async () => {
        await SettingsPage.tap(SETTINGS_MENU_ITEMS.USE_PIN_CODE).then(waitSetPinPage);
        await SetPinPage.enterPinCode(SAME_NUMBER);
        await errorMessageShouldBeCorrect(
            SETTINGS_ERROR_MESSAGES.PIN.PIN_CANT_BE_SAME_REPEATED_NUMBER,
        );
    });

    it('No sequential pins should be displayed', async () => {
        await SetPinPage.enterPinCode(SEQUENTIAL);
        await errorMessageShouldBeCorrect(SETTINGS_ERROR_MESSAGES.PIN.PIN_CANT_BE_SEQUENTIAL);
    });

    it('Pin should be added', async () => {
        await SetPinPage.enterPinCode(VALID);
        await RepeatPinPage.waitForOpened();
        await SetPinPage.enterPinCode(VALID).then(waitSettingsPage);
    });

    it('User should be able to log in to the app using pin', async () => {
        await SettingsPage.logOut();
        await LoginPage.tapLoginIcon(LOGIN_ICON_TYPES.PIN);
        await SetPinPage.enterPinCode(INVALID);
        await errorMessageShouldBeCorrect(ERROR_MESSAGES.AUTHENTICATION.LOGIN.INVALID_PIN);
        await SetPinPage.enterPinCode(VALID);
        expect(await SetPinPage.isClosed(), 'Set pin page should not be opened.').to.be.true;
    });
});

async function errorMessageShouldBeCorrect(expectedErrorMessage) {
    if (!driver.isIOS) {
        addStep('Validate error message');
        const actualErrorMessage =
            expectedErrorMessage === ERROR_MESSAGES.AUTHENTICATION.LOGIN.INVALID_PIN
                ? await NativeAlert.getAlertMessage()
                : await NativeAlert.getAlertTitle();
        expect(actualErrorMessage).to.eql(
            expectedErrorMessage,
            `Error message must be present and has text: ${expectedErrorMessage}`,
        );
        await NativeAlert.pressOk();
    }
}
