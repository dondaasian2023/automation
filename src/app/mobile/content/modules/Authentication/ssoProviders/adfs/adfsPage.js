import element from 'src/element';
import commonPage from 'src/app/mobile/content/components/commonPage';

const SELECTORS = {
    PAGE_ID: {
        ios: '~Sign in with your organizational account',
        android: '//android.view.View[@text="Sign in with your organizational account"]',
    },
    LOGIN_FORM: {
        USERNAME_INPUT: '#userNameInput',
        PASSWORD_INPUT: '#passwordInput',
        SUBMIT_BTN: '#submitButton',
    },
};

const URL_SUBSTR = 'adfsdemo.dealclouddev.com';

async function login(username, password) {
    await element(SELECTORS.LOGIN_FORM.USERNAME_INPUT).setValue(username);
    await element(SELECTORS.LOGIN_FORM.PASSWORD_INPUT).setValue(password);
    await element(SELECTORS.LOGIN_FORM.SUBMIT_BTN).clickElement();
}

const AdfsPage = { login, ...commonPage(SELECTORS.PAGE_ID, 'ADFS'), URL_SUBSTR };
export default AdfsPage;
