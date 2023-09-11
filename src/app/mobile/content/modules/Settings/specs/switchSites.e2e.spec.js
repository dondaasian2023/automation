import SettingsPage, {
    SETTINGS_MENU_ITEMS,
} from 'src/app/mobile/content/modules/Settings/pages/settingsPage';
import theme from 'src/services/theme';
import env from 'src/services/environment';
import MorePage from 'src/app/mobile/content/modules/More/pages/morePage';
import Main from 'src/app/mobile/content/core/pages/main';
import AuthActions from 'src/app/mobile/actions/authActions';
import userService from 'src/services/userService';
import { expect } from 'chai';
import description from 'src/services/reporting/description';
import { openMore } from 'src/app/mobile/actions/mainActions';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';

const { SWITCH_SITES_BUTTON } = SETTINGS_MENU_ITEMS;
const waitForSettingsPageOpened = () => SettingsPage.waitForOpened();

if (theme.isOP || env.isQA) {
    describe.skip;
} else {
    describe(description.applyEnv('Security: Switch Sites'), async () => {
        const [USER] = userService.getUsersWithMultipleClients();
        const [{ TEXT: CLIENT_1 }, { TEXT: CLIENT_2 }] = userService.getUserClients(USER);

        before('Open "Settings"', async () => {
            await AuthActions.skipOnboardingScreens();
            await AuthActions.loginToApplication(USER, { clientName: CLIENT_1 });
            await openMore();
            await MorePage.NavBar.settings().then(waitForSettingsPageOpened);
        });

        it('Select other client', async () => {
            await SettingsPage.tap(SWITCH_SITES_BUTTON);
            await NativeAlert.pressYes();
            await AuthActions.loginToApplication(USER, { clientName: CLIENT_2 });
            expect(await Main.isPlusButtonDisplayed()).to.be.true;
        });
    });
}
