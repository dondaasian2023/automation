import element from 'src/element';
import commonPage from 'src/app/mobile/content/components/commonPage';

const SELECTORS = {
    PAGE_ID: {
        ios: '~Microsoft',
        android: '//android.widget.Image[@text="Microsoft"]',
    },
    PASSWORD_INPUT: '//input[@name="passwd"]',
    SUBMIT_BTN: '//input[@type="submit"]',
    STAY_SIGNED_IN: {
        BUTTON: {
            NO: '//input[@value="No"]',
            YES: '//input[@value="Yes"]',
        },
        FORM_MESSAGE:
            '//div[text()="Do this to reduce the number of times you are asked to sign in."]',
    },
};

const URL = 'https://login.microsoftonline.com/';

async function login(password, isStaySignedIn = false) {
    await element(SELECTORS.PASSWORD_INPUT).setValue(password);
    await element(SELECTORS.SUBMIT_BTN).clickElement();
    await staySignedIn(isStaySignedIn);
}

async function staySignedIn(isStay = false) {
    await element(SELECTORS.STAY_SIGNED_IN.FORM_MESSAGE).isElementDisplayed();
    const btnForClick = isStay
        ? SELECTORS.STAY_SIGNED_IN.BUTTON.YES
        : SELECTORS.STAY_SIGNED_IN.BUTTON.NO;

    await element(btnForClick).clickElement();
}

const MicrosoftAuthPage = {
    login,
    ...commonPage(SELECTORS.PAGE_ID, 'Microsoft'),
    URL,
};
export default MicrosoftAuthPage;
