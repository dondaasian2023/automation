import SettingsPage, {
    SETTINGS_MENU_ITEMS,
} from 'src/app/mobile/content/modules/Settings/pages/settingsPage';
import {
    RepeatPinPage,
    SetPinPage,
} from 'src/app/mobile/content/modules/Settings/components/pinCodePage';
import PIN_CODES from 'src/app/mobile/content/modules/Authentication/specs/testData/pinCodes';
import { addStep } from 'src/services/reporting/allure';
import { openMore } from 'src/app/mobile/actions/mainActions';
import MorePage from 'src/app/mobile/content/modules/More/pages/morePage';
import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';

const { VALID } = PIN_CODES;

export const setUpPin = async (pin = VALID) => {
    addStep(`Set PIN - "${pin}"`);
    await SettingsPage.tap(SETTINGS_MENU_ITEMS.USE_PIN_CODE);
    await SetPinPage.waitForOpened();
    await SetPinPage.enterPinCode(pin);
    await RepeatPinPage.waitForOpened();
    await SetPinPage.enterPinCode(pin);
};

export const logOutFromApplication = async () => {
    addStep('Logout from the app');
    await openMore();
    await MorePage.NavBar.settings();

    await SettingsPage.waitForOpened();
    await SettingsPage.logOut();
    await NativeAlert.pressYes();

    await LoginPage.waitForOpened();
};
