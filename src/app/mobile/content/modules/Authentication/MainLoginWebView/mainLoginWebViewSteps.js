import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import CustomDomainPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/customDomainPage';

async function specifyCustomDomain(domain, { rememberMe = false } = {}) {
    await LoginPage.clickCustomDomain();
    await LoginPage.enterCustomDomain(domain);
    if (rememberMe) {
        await LoginPage.clickRememberMe();
    }
    await LoginPage.clickNext();
}

async function enterCustomDomainEmail(email) {
    await CustomDomainPage.enterEmail(email);
    await CustomDomainPage.clickContinue();
}

const MainLoginWebViewSteps = { specifyCustomDomain, enterCustomDomainEmail };
export default MainLoginWebViewSteps;
