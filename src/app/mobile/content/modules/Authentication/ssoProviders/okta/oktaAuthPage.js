import element from 'src/element';
import commonPage from 'src/app/mobile/content/components/commonPage';

const TITLE = 'okta';
const CHROME_VIEW_ID = 'WEBVIEW_chrome';
const DC_VIEW_ID = 'WEBVIEW_com.dealcloud.mobileapp.dev';

const SELECTORS = {
    PAGE_ID: {
        ios: '-ios class chain:**/XCUIElementTypeStaticText[`label == "Sign In"`]',
        android: '//android.view.View[@text="Sign In"]',
    },
    USERNAME_INPUT: '#okta-signin-username',
    PASSWORD_INPUT: '#okta-signin-password',
    SUBMIT_BTN: '#okta-signin-submit',
    SECURITY_TIP: "#qtip-0[role='alert']",
};

async function login(oktaUsername, oktaPassword) {
    const userNameInput = await element(SELECTORS.USERNAME_INPUT);
    await userNameInput.isElementEnabled();
    await userNameInput.setValue(oktaUsername);
    await element(SELECTORS.PASSWORD_INPUT).setValue(oktaPassword);
    await element(SELECTORS.SUBMIT_BTN).clickElement();
    if (await element(SELECTORS.SECURITY_TIP).isElementDisplayed({ timeout: 2000 })) {
        await element(SELECTORS.SUBMIT_BTN).clickElement();
    }
}

const OktaAuthPage = {
    login,
    ...commonPage(SELECTORS.PAGE_ID, 'Okta'),
    TITLE,
    CHROME_VIEW_ID,
    DC_VIEW_ID,
};

export default OktaAuthPage;
