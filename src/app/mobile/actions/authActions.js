import FirstOnboardingPage from 'src/app/mobile/content/modules/Onboarding/pages/firstOnboardingPage';
import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import SelectSitePage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/selectSitePage';
import theme from 'src/services/theme';
import Context from 'src/services/driver/context';
import device from 'src/services/device';
import { LOGIN_PORTAL_START_URL_PATH } from 'src/constants/endpoints';
import { sleep } from 'src/services/driver/driverActions';
import { addStep } from 'src/services/reporting/allure';
import CustomDomainPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/customDomainPage';

const WAIT_APP_TIME_MS = 10000;

async function loginToApplication(user, { clientName } = {}) {
    await Context.switchToNativeApp();
    await LoginPage.waitForOpened();
    await Context.switchToContextByParams({ url: LOGIN_PORTAL_START_URL_PATH });
    await LoginPage.login(user);
    await Context.switchToNativeApp();
    await selectSite(clientName);
    await sleep(WAIT_APP_TIME_MS);
}

async function selectSite(clientName) {
    if (theme.isDC && clientName) {
        addStep(`Select client: ${clientName}`);
        await SelectSitePage.waitForOpened();
        await SelectSitePage.selectSite(clientName);
    }
}

async function loginWithCustomDomain({ EMAIL, PASSWORD, DOMAIN }) {
    addStep(`Login with custom domain: ${DOMAIN}, ${EMAIL}, ${PASSWORD}`);
    await LoginPage.clickCustomDomain();
    await LoginPage.enterCustomDomain(DOMAIN);
    await LoginPage.clickNext();

    await CustomDomainPage.enterEmail(EMAIL);
    await CustomDomainPage.clickContinue();

    await CustomDomainPage.enterPassword(PASSWORD);
    await CustomDomainPage.clickLogIn();
}

async function skipOnboardingScreens() {
    if (!device.isIpad()) {
        addStep('Skip onboarding screens');
        await FirstOnboardingPage.waitForOpened();
        await FirstOnboardingPage.clickSkip();
    }

    await LoginPage.waitForOpened();
}

const AuthActions = { loginToApplication, skipOnboardingScreens, loginWithCustomDomain };
export default AuthActions;
