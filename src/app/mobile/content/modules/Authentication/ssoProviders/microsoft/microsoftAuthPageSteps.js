import Context from 'src/services/driver/context';
import MicrosoftAuthPage from 'src/app/mobile/content/modules/Authentication/ssoProviders/microsoft/microsoftAuthPage';

async function login(password) {
    await Context.switchToNativeApp();
    await MicrosoftAuthPage.waitForOpened();
    await Context.switchToContextByParams(
        { url: MicrosoftAuthPage.URL },
        { strictEquality: false }
    );
    await driver.deleteAllCookies();
    await MicrosoftAuthPage.login(password);
    await Context.switchToNativeApp();
}

const MicrosoftAuthPageSteps = { login };
export default MicrosoftAuthPageSteps;
