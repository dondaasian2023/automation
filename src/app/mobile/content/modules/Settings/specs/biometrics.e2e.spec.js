import description from 'src/services/reporting/description';
import env from 'src/services/environment';
import { resetApp } from 'src/services/driver/driverActions';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import AuthActions from 'src/app/mobile/actions/authActions';
import { expect } from 'chai';
import changeMobileSettings from 'src/app/web/modules/Settings/api/services/changeMobileSettings';
import { cookAuthenticationSettings } from 'src/app/web/modules/Settings/api/mobileSettingsConfig/cookAuthenticationSettings';
import SettingsPage from 'src/app/mobile/content/modules/Settings/pages/settingsPage';
import { navigateToSettings } from 'src/app/mobile/actions/mainActions';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

let restClient;

const biometricsAuthenticationStates = [true, false];

// TODO: update according to TEST CASE 36280, enable test only for iOS when snapshot issue is resolved
describe.skip(description.applyEnv('Site settings: Enabled biometrics'), async () => {
    before(async () => {
        restClient = await authorize(ENV_URL, USER);
    });
    biometricsAuthenticationStates.forEach(function (state) {
        {
            it(`Biometrics setting enabled should be ${state}`, async () => {
                const appResetting = resetApp();
                const authenticationSettings = cookAuthenticationSettings({
                    appPinCodeTouchEnabled: state,
                });
                await changeMobileSettings(restClient, authenticationSettings);
                await appResetting;
                await AuthActions.skipOnboardingScreens();
                await AuthActions.loginToApplication(USER);
                await navigateToSettings();

                expect(
                    await (
                        await SettingsPage.useBiometrics({ hasBiometric: false, isDisabled: !state })
                    ).isElementDisplayed()
                ).to.be.true;
            });
        }
    });
});
