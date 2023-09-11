import device from 'src/services/device';

require('dotenv').config();
import FirstOnboardingPage from 'src/app/mobile/content/modules/Onboarding/pages/firstOnboardingPage';
import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import SecondOnboardingPage from 'src/app/mobile/content/modules/Onboarding/pages/secondOnboardingPage';
import ThirdOnboardingPage from 'src/app/mobile/content/modules/Onboarding/pages/thirdOnboardingPage';
import FourthOnboardingPage from 'src/app/mobile/content/modules/Onboarding/pages/fourthOnboardingPage';
import { resetApp } from 'src/services/driver/driverActions';
import { expect } from 'chai';
import { addStep } from 'src/services/reporting/allure';
import description from 'src/services/reporting/description';

if (device.isIpad()) {
    describe.skip;
} else {
    describe(
        description.applyEnv('Onboarding screens should be displayed on the 1st app opening'),
        async () => {
            beforeEach('Reset application', async () => {
                await resetApp();
            });

            it('Login screen should be displayed after tap "Skip"', async () => {
                await FirstOnboardingPage.waitForOpened();
                await FirstOnboardingPage.clickSkip();
                await expectLoginPageOpened();
            });

            it('Next onboarding screen should be displayed after tap "Next"', async () => {
                await FirstOnboardingPage.waitForOpened();
                await FirstOnboardingPage.clickNext();

                await SecondOnboardingPage.waitForOpened();
                await SecondOnboardingPage.clickNext();

                await ThirdOnboardingPage.waitForOpened();
                await ThirdOnboardingPage.clickNext();

                await FourthOnboardingPage.waitForOpened();
                await FourthOnboardingPage.clickLogInButton();

                await expectLoginPageOpened();
            });
        }
    );
}

async function expectLoginPageOpened() {
    addStep.pageShouldBeOpened('Login Page');
    expect(await LoginPage.isOpened()).to.be.true;
}
