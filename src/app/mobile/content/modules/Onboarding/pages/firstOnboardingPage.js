import commonPage from 'src/app/mobile/content/components/commonPage';
import Onboarding from 'src/app/mobile/content/modules/Onboarding/pages/onboarding';

const SELECTORS = {
    NEXT_BUTTON: '~feature_onboarding_onboarding-btn-next',
};

const FirstOnboardingPage = {
    ...commonPage(SELECTORS.NEXT_BUTTON, '1st Onboarding screen'),
    ...Onboarding,
};
export default FirstOnboardingPage;
