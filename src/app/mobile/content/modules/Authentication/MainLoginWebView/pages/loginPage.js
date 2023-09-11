import commonPage from 'src/app/mobile/content/components/commonPage';
import LoginForm from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/forms/loginForm';
import ErrorMessageContainer from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/forms/errorMessageContainer';
import ResetPasswordForm from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/forms/resetPasswordForm';
import element from 'src/element';
import { addStep } from 'src/services/reporting/allure';
import { cookTestID } from 'src/services/cookTestID';

const SELECTORS = {
    USE_CUSTOM_DOMAIN_LINK: "//div[text()='Use Custom Domain']",
    CONTACT_US_LINK: '~authentication_login_contact-us',
    SETTINGS_LINK: '~authentication_login_data-center',
    LOGIN_ICON: 'authentication_internal-login-control_login-icon-{loginIconType}',
};

async function clickCustomDomain() {
    await element(SELECTORS.USE_CUSTOM_DOMAIN_LINK).clickElement();
}

async function clickSettings() {
    await element(SELECTORS.SETTINGS_LINK).clickElement();
}

async function tapLoginIcon(loginIconType) {
    addStep(`Tap ${loginIconType}`);
    const testID = cookTestID(SELECTORS.LOGIN_ICON, { loginIconType });
    await element(testID).tapElement();
}

async function login({ EMAIL, PASSWORD }, { rememberMe = false } = {}) {
    addStep(`Login to app: ${EMAIL}, ${PASSWORD}`);
    await LoginForm.enterUserName(EMAIL);

    if (rememberMe) {
        await LoginForm.clickRememberMe();
    }

    await LoginForm.clickNext();
    await LoginForm.enterPassword(PASSWORD);
    await LoginForm.clickLogIn();
}

const LoginPage = {
    ...commonPage(SELECTORS.CONTACT_US_LINK, 'Login'),
    ...LoginForm,
    ...ErrorMessageContainer,
    ResetPasswordForm,
    clickCustomDomain,
    clickSettings,
    login,
    tapLoginIcon,
};
export default LoginPage;
