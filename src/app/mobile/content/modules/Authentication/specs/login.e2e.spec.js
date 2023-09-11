require('dotenv').config();
import { resetApp } from 'src/services/driver/driverActions';
import Context from 'src/services/driver/context';
import AuthActions from 'src/app/mobile/actions/authActions';
import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';
import { expect } from 'chai';
import ERROR_MESSAGES from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/constants/errorMessages';
import { LOGIN_PORTAL_START_URL_PATH } from 'src/constants/endpoints';
import { email, password } from 'src/services/fakeDataGenerator';
import userService from 'src/services/userService';
import { addStep } from 'src/services/reporting/allure';
import description from 'src/services/reporting/description';
import element from 'src/element';
import { sleep } from 'src/services/driver/driverActions';
import SelectSitePage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/selectSitePage';
import { Key } from 'webdriverio'

const { INCORRECT_EMAIL_OR_PASSWORD } = ERROR_MESSAGES.AUTHENTICATION.LOGIN;

const [USER, CLIENT_NAME] = userService.getNoMobileAccessUser();

const { EMAIL, PASSWORD } = USER;

const invalidEmail = email();
const invalidPassword = password();

const gemstoneUser = 'gemstone@tsunamisoft.onmicrosoft.com';
const gemstonePass = 'NudgeUserTest2021!';

const kostiaUser = 'kosta.lapshyn@intapp.com';
const kostiaPass = '!Lovesweetnegron1';

const SELECTORS = {
    GEMSTONE_DEMO: "//*[contains(text(), 'Gemstone Demo')]",
    COOLING_CONTACT: "//*[contains(text(), 'Cooling Contact')]",
    REFRESH_DEMO_SCRIPT: "//*[contains(text(), 'Would you like to add Derek Armanious to your favorites?')]",
    CANCEL_BUTTON: "//android.view.ViewGroup[@bounds='[388,801][622,939]']",
    OKAY_BUTTON: "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup",
    LOGIN_ICON: 'authentication_internal-login-control_login-icon-{loginIconType}',
    NETWORK_LABEL: "//android.view.ViewGroup[normalize-space(@text) = 'Cancel']",
    NEWSALERT_LABEL: "//android.widget.TextView[normalize-space(@text) = 'News Alert']",
};


describe(description.applyEnv('Login/Logout'), async () => {
    beforeEach('Navigate to Login Screen', async () => {
        await resetApp();
        await Context.switchToNativeApp();
        await AuthActions.skipOnboardingScreens();
        await LoginPage.waitForOpened();
        await Context.switchToContextByParams({ url: LOGIN_PORTAL_START_URL_PATH });
    });

    it.skip('User with invalid password should not be logged in', async () => {
        await LoginPage.login({ EMAIL, PASSWORD: invalidPassword });
        await errorMessageShouldBeCorrect(INCORRECT_EMAIL_OR_PASSWORD);
    });

    it.skip('Gemstone user should be able to login', async () => {
        await LoginPage.login({ EMAIL: gemstoneUser, PASSWORD: gemstonePass });
    });

    it('Demo Script Run Through', async () => {
        await LoginPage.login({ EMAIL: kostiaUser, PASSWORD: kostiaPass });
        // await selectSite(clientName);
        // await element(SELECTORS.GEMSTONE_DEMO).clickElement();
        await sleep(25000)

        await Context.switchToNativeApp();

        // const bottomElementSelector = 'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Cancel")))'
        // const bottomEl = $(`android=${bottomElementSelector}`)
        // await bottomEl.click();
        // console.log(bottomEl);

        // const CANCEL_BUTTON = $('NudgesButton')

        await element(SELECTORS.CANCEL_BUTTON).clickElement();

        await sleep(300)

        // const elem = element(SELECTORS.COOLING_CONTACT);
        // const elem2 = $(`android=${elem}`)
        // await elem.scrollIntoView({ behavior: "smooth" , block: 'start'});
        // console.log(elem)
        
        // await sleep(300)

        const bottomElementSelector2 = 'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().className("android.widget.TextView").text("Cooling Contact"))'
        const bottomEl2 = $(`android=${bottomElementSelector2}`)
        await bottomEl2
        console.log(bottomEl2);

        // const bottomElementSelector2 = 'new UiSelector().text("Cooling Contact").className("android.widgetx.TextView")'
        // const bottomEl2 = $(`android=${bottomElementSelector2}`)
        // await bottomEl2.isDisplayed();
        // console.log(bottomEl2);

        // await sleep(300)

        // const bottomElementSelector = 'new UiSelector().text("Cooling Contact").className("android.widget.TextView")'
        // const bottomEl = await $(`android=${bottomElementSelector}`)
        // await bottomEl.isDisplayed();
        // console.log(bottomEl);

        // const bottomElementSelector3 = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView("//body[@class='android.widget.TextView' and text()='']"))`
        // const bottomEl3 = $(`android=${bottomElementSelector3}`)
        // await bottomEl3.isDisplayed();
        // console.log(bottomEl3);

    });



    //TODO: Accept alert
    it.skip('User with invalid email should not be logged in', async () => {
        await LoginPage.login({ EMAIL: invalidEmail, PASSWORD });
        await errorMessageShouldBeCorrect(INCORRECT_EMAIL_OR_PASSWORD);
    });

    it.skip('To the client where "Mobile App" capability disabled should not be logged in', async () => {
        await AuthActions.loginToApplication(USER, { clientName: CLIENT_NAME });
        addStep(
            'Alert with text "You have no access to Mobile app functionality." should be displayed'
        );
        await NativeAlert.pressTryAgain();
        await LoginPage.waitForOpened();
    });
});

async function errorMessageShouldBeCorrect(errorMessage) {
    addStep('Validate error message');
    const actualErrorMessage = await LoginPage.getErrorMessage();

    expect(actualErrorMessage).to.eql(
        errorMessage,
        `Error message must be present and has text: ${errorMessage}`
    );
}
