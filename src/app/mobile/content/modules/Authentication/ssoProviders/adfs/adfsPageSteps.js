import AdfsPage from 'src/app/mobile/content/modules/Authentication/ssoProviders/adfs/adfsPage';
import Context from 'src/services/driver/context';

async function login(email, password) {
    await AdfsPage.waitForOpened();
    await Context.switchToContextByParams({ url: AdfsPage.URL_SUBSTR }, { strictEquality: false });
    await driver.deleteAllCookies();
    await AdfsPage.login(email, password);
    await Context.switchToNativeApp();
}

const AdfsPageSteps = { login };
export default AdfsPageSteps;
