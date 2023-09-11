import Context from 'src/services/driver/context';
import OktaAuthPage from 'src/app/mobile/content/modules/Authentication/ssoProviders/okta/oktaAuthPage';
import theme from 'src/services/theme';
import env from 'src/services/environment';

const getWebviewTitle = () => {
    if (theme.isOP) {
        return OktaAuthPage.TITLE;
    }
    if (theme.isDC) {
        return env.isQA2 ? 'Sign In' : 'DealCloud | Log in';
    }
};

const title = getWebviewTitle();

async function login(email, password) {
    await Context.switchToNativeApp();
    await OktaAuthPage.waitForOpened();

    await Context.switchToContextByParams({ title }, { strictEquality: false, reverse: true });
    await driver.deleteAllCookies();

    await OktaAuthPage.login(email, password);
    await Context.switchToNativeApp();
}

const OktaAuthPageSteps = { login };
export default OktaAuthPageSteps;
