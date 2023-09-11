import element from 'src/element';
import { sleep } from 'src/services/driver/driverActions';

const SELECTORS = {
    USE_CUSTOM_DOMAIN: "//div[text()='Use Custom Domain']",
    CUSTOM_DOMAIN_INPUT: '#CustomDomain',
    EMAIL_INPUT: '//*[@id="Email" or @id="username"]',
    PASSWORD_INPUT: "//*[@data-qa-id='password_input' or @id='password']",
    NEXT_BUTTON: '//input[@data-qa-id="next_button"]',
    LOGIN_BUTTON: '//input[@data-qa-id="ok_button"] | //*[@id="kc-login"]',
    FORGOT_YOUR_PASSWORD_LINK: '//*[@data-qa-id="forgot-password_link"]',
    REMEMBER_ME_CHECKBOX: '//label[@data-qa-id="remember-me_checkbox"]',
};

async function enterCustomDomain(domain) {
    const input = element(SELECTORS.CUSTOM_DOMAIN_INPUT);
    await input.setValue(domain);
}

async function enterUserName(username) {
    const input = element(SELECTORS.EMAIL_INPUT);
    await input.clearValueByBackspaces();
    await input.setValue(username);
}

async function clickNext() {
    const nextBtn = element(SELECTORS.NEXT_BUTTON);
    await nextBtn.isElementEnabled();
    await nextBtn.clickElement();
    await sleep(3000);
}

async function enterPassword(password) {
    const passwordInput = element(SELECTORS.PASSWORD_INPUT);
    await passwordInput.isElementEnabled();
    await passwordInput.setValue(password);
}

async function clickLogIn() {
    const loginBtn = element(SELECTORS.LOGIN_BUTTON);
    await loginBtn.clickElement();
}

async function clickRememberMe() {
    await element(SELECTORS.REMEMBER_ME_CHECKBOX).clickElement();
}
async function clickForgotYourPassword() {
    await element(SELECTORS.FORGOT_YOUR_PASSWORD_LINK).clickElement();
}

const LoginForm = {
    enterUserName,
    clickNext,
    clickRememberMe,
    enterPassword,
    clickLogIn,
    clickForgotYourPassword,
    enterCustomDomain,
};
export default LoginForm;
