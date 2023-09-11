import element from 'src/element';

const SELECTORS = {
    FORGOT_PASSWORD_LINK: "#//a[text()='Forgot Password?']",
    EMAIL_INPUT: '#username',
};

async function enterEmail(username) {
    const emailInput = element(SELECTORS.EMAIL_INPUT);
    await emailInput.clickElement();
    await emailInput.setValue(username);
}

async function clickResetPassword() {
    await element(SELECTORS.FORGOT_PASSWORD_LINK).clickElement();
}

const ResetPasswordForm = { clickResetPassword, enterEmail };
export default ResetPasswordForm;
