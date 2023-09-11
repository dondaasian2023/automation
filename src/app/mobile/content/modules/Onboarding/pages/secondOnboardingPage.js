import commonPage from 'src/app/mobile/content/components/commonPage';
import Onboarding from 'src/app/mobile/content/modules/Onboarding/pages/onboarding';

const SELECTORS = {
    TEXT_TITLE: {
        ios: '~Interactive reporting',
        android: '//android.widget.TextView[@text="Interactive reporting"]',
    },
};

const SecondOnboardingPage = {
    ...commonPage(SELECTORS.TEXT_TITLE, '2nd Onboarding screen'),
    ...Onboarding,
};
export default SecondOnboardingPage;
