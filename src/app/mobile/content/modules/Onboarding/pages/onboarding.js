import onBoardingBtn from 'src/app/mobile/content/modules/Onboarding/components/onboardingBtn';
import { addStep } from 'src/services/reporting/allure';

async function clickSkip() {
    await clickBtn('Skip');
}

async function clickAddCalendars() {
    await clickBtn('Add calendars');
}

async function clickSetupLater() {
    await clickBtn('Setup Later');
}
async function clickNext({ times = 1 } = {}) {
    addStep(`Click "Next" ${times} times`);
    await clickBtn('Next', times);
}

async function clickBtn(name, times) {
    addStep(`Click "${name}"`);
    await onBoardingBtn(name).clickElement(times);
}

const Onboarding = { clickSkip, clickNext, clickAddCalendars, clickSetupLater };
export default Onboarding;
