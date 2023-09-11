import commonPage from 'src/app/mobile/content/components/commonPage';
import element from 'src/element';

const SELECTORS = {
    TEXT_TITLE: {
        ios: '~Notifications',
        android: '//android.widget.TextView[@text="Notifications"]',
    },

    LOGIN_BUTTON: {
        ios: '-ios class chain:**/XCUIElementTypeOther[`label == "LOGIN"`][3]',
        android: '//android.view.ViewGroup[@index=4]',
    },
};

async function clickLogInButton() {
    await element(SELECTORS.LOGIN_BUTTON).tapElement();
}

const FourthOnboardingPage = {
    ...commonPage(SELECTORS.TEXT_TITLE),
    clickLogInButton,
};
export default FourthOnboardingPage;
