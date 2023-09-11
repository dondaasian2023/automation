import element from 'src/element';
import commonPage from 'src/app/mobile/content/components/commonPage';

const SELECTORS = {
    EMAIL_INPUT: '#email',
    PASSWORD_INPUT: '#password',
    LOG_IN_BUTTON: '#kc-login',
    CONTINUE_BUTTON: '#kc-submit',
};

async function enterEmail(username) {
    const input = element(SELECTORS.EMAIL_INPUT);
    await input.setValue(username);
}

async function enterPassword(password) {
    await element(SELECTORS.PASSWORD_INPUT).setValue(password);
}

async function clickContinue() {
    await element(SELECTORS.CONTINUE_BUTTON).clickElement();
}

async function clickLogIn() {
    await element(SELECTORS.LOG_IN_BUTTON).clickElement();
}

const CustomDomainPage = {
    ...commonPage(SELECTORS.LOG_IN_BUTTON, 'Login'),
    enterEmail,
    enterPassword,
    clickContinue,
    clickLogIn,
};
export default CustomDomainPage;
