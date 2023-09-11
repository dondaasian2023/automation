import commonPage from 'src/app/mobile/content/components/commonPage';
import Onboarding from 'src/app/mobile/content/modules/Onboarding/pages/onboarding';

const SELECTORS = {
    TEXT_TITLE: {
        ios: '~Meetings',
        android: '//android.widget.TextView[@text="Meetings"]',
    },
};

const ThirdOnboardingPage = {
    ...commonPage(SELECTORS.TEXT_TITLE, '3st Onboarding screen'),
    ...Onboarding,
};
export default ThirdOnboardingPage;
