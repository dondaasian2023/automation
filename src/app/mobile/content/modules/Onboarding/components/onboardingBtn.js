import { cookTestID } from 'src/services/cookTestID';
import element from 'src/element';

const ONBOARDING_BUTTON_SELECTOR = 'feature_onboarding_onboarding-btn-{name}';

export default function onBoardingBtn(name) {
    const testId = cookTestID(ONBOARDING_BUTTON_SELECTOR, { name });
    return element(testId);
}
