import AuthActions from 'src/app/mobile/actions/authActions';
import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';
import Context from 'src/services/driver/context';
import theme from 'src/services/theme';
import AdfsPageSteps from 'src/app/mobile/content/modules/Authentication/ssoProviders/adfs/adfsPageSteps';
import MicrosoftAuthPageSteps from 'src/app/mobile/content/modules/Authentication/ssoProviders/microsoft/microsoftAuthPageSteps';
import OktaAuthPageSteps from 'src/app/mobile/content/modules/Authentication/ssoProviders/okta/oktaAuthSteps';
import MainLoginWebViewSteps from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/mainLoginWebViewSteps';
import env from 'src/services/environment';
import { resetApp } from 'src/services/driver/driverActions';
import { LOGIN_PORTAL_START_URL_PATH } from 'src/constants/endpoints';
import description from 'src/services/reporting/description';
import { expect } from 'chai';
import Main from 'src/app/mobile/content/core/pages/main';
import { PAGE_NAMES } from 'src/constants/navigation';
import SSO_USERS_DC_QA from 'variables/dc/qa/sso-users.json';
import SSO_USERS_DC_QA2 from 'variables/dc/qa2/sso-users.json';
import SSO_USERS_OP_QA from 'variables/op/qa/sso-users.json';
import { SSO_PROVIDERS } from 'src/app/mobile/content/modules/Authentication/specs/sso/ssoProviders';
import milliseconds from 'src/utils/milliseconds';

const { OKTA, ADFS, AZURE } = SSO_PROVIDERS;

// DEVNOTE: There are no available SSO accounts for OP QA2
(theme.isOP && env.isQA2 ? describe.skip : describe)(
    description.applyEnv('Login/Logout'),
    async () => {
        describe('SSO', async () => {
            beforeEach(async () => {
                await resetApp();
                await Context.switchToNativeApp();
                await AuthActions.skipOnboardingScreens();
                await Context.switchToContextByParams({ url: LOGIN_PORTAL_START_URL_PATH });
            });

            if (theme.isDC && env.isQA) {
                it.skip(ADFS, async () => {
                    const { EMAIL, PASSWORD } = SSO_USERS_DC_QA.ADFS;
                    await LoginPage.enterUserName(EMAIL);
                    await LoginPage.clickNext();

                    await handleAlert();

                    await AdfsPageSteps.login(EMAIL, PASSWORD);
                    await expectUserLoggedIn();
                });

                it(OKTA, async () => {
                    const { EMAIL, PASSWORD } = SSO_USERS_DC_QA.OKTA;
                    await LoginPage.enterUserName(EMAIL);
                    await LoginPage.clickNext();

                    await handleAlert();

                    await OktaAuthPageSteps.login(EMAIL, PASSWORD);
                    await expectUserLoggedIn();
                });

                it(AZURE, async () => {
                    const { EMAIL, PASSWORD } = SSO_USERS_DC_QA.AZURE;
                    await LoginPage.enterUserName(EMAIL);
                    await LoginPage.clickNext();
                    await handleAlert();

                    /* await MainLoginWebViewSteps.enterCustomDomainEmail(EMAIL);*/
                    await MicrosoftAuthPageSteps.login(PASSWORD);
                    await expectUserLoggedIn();
                });
            }

            if (theme.isDC && env.isQA2) {
                it.skip(ADFS, async () => {
                    const { EMAIL, PASSWORD } = SSO_USERS_DC_QA2.ADFS;
                    await LoginPage.enterUserName(EMAIL);
                    await LoginPage.clickNext();

                    await handleAlert();

                    await AdfsPageSteps.login(EMAIL, PASSWORD);
                    await expectUserLoggedIn();
                });

                it(OKTA, async () => {
                    const { EMAIL, PASSWORD } = SSO_USERS_DC_QA2.OKTA;
                    await LoginPage.enterUserName(EMAIL);
                    await LoginPage.clickNext();

                    await handleAlert();

                    await OktaAuthPageSteps.login(EMAIL, PASSWORD);
                    await expectUserLoggedIn();
                });
            }

            if (theme.isOP && env.isQA) {
                it(OKTA, async () => {
                    const { EMAIL, PASSWORD, DOMAIN } = SSO_USERS_OP_QA.OKTA;
                    await MainLoginWebViewSteps.specifyCustomDomain(DOMAIN, {
                        rememberMe: true,
                    });
                    await MainLoginWebViewSteps.enterCustomDomainEmail(EMAIL);
                    await OktaAuthPageSteps.login(EMAIL, PASSWORD);
                    await expectUserLoggedIn();
                });

                it(AZURE, async () => {
                    const { EMAIL, PASSWORD, DOMAIN } = SSO_USERS_OP_QA.AZURE;
                    await MainLoginWebViewSteps.specifyCustomDomain(DOMAIN, {
                        rememberMe: true,
                    });
                    await MainLoginWebViewSteps.enterCustomDomainEmail(EMAIL);
                    await MicrosoftAuthPageSteps.login(PASSWORD);
                    await expectUserLoggedIn();
                });
            }
        });
    }
);

async function expectUserLoggedIn() {
    expect(
        await Main.isTabDisplayed(PAGE_NAMES.MORE, milliseconds.seconds(40)),
        'User should be logged in application and bottom bar should be displayed'
    ).to.be.true;
}

async function handleAlert() {
    await Context.switchToNativeApp();
    if (driver.isIOS) {
        await NativeAlert.pressContinue();
    }
}
