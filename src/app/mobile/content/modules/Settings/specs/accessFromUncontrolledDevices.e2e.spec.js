import env from 'src/services/environment';
import description from 'src/services/reporting/description';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import { resetApp } from 'src/services/driver/driverActions';
import { cookAuthenticationSettings } from 'src/app/web/modules/Settings/api/mobileSettingsConfig/cookAuthenticationSettings';
import changeMobileSettings from 'src/app/web/modules/Settings/api/services/changeMobileSettings';
import AuthActions from 'src/app/mobile/actions/authActions';
import expectSecurityMDMLockMessageDisplayed from 'src/app/mobile/content/modules/Settings/specs/services/expectations';
import { expect } from 'chai';
import Main from 'src/app/mobile/content/core/pages/main';
import { PAGE_NAMES } from 'src/constants/navigation';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

let restClient;
let authenticationSettings;

describe(description.applyEnv('Access from uncontrolled devices'), async () => {
    beforeEach(async () => {
        restClient = await authorize(ENV_URL, USER);
        await resetApp();
    });

    after(async () => {
        authenticationSettings = cookAuthenticationSettings({
            appPinCodeTouchEnabled: true,
            allowLoginFromUncontrolledDevices: true,
        });
        await changeMobileSettings(restClient, authenticationSettings);
    });

    it('User with disabled access from uncontrolled devices should not be logged in', async () => {
        authenticationSettings = cookAuthenticationSettings({
            allowLoginFromUncontrolledDevices: false,
        });
        await changeMobileSettings(restClient, authenticationSettings);
        await AuthActions.skipOnboardingScreens();
        await AuthActions.loginToApplication(USER);
        await expectSecurityMDMLockMessageDisplayed();
    });

    it('User with enabled access from uncontrolled devices should be logged in', async () => {
        authenticationSettings = cookAuthenticationSettings({
            allowLoginFromUncontrolledDevices: true,
        });
        await changeMobileSettings(restClient, authenticationSettings);
        await AuthActions.skipOnboardingScreens();
        await AuthActions.loginToApplication(USER);
        expect(
            await Main.isTabDisplayed(PAGE_NAMES.MORE),
            'User should be logged in application and bottom bar should be displayed'
        ).to.be.true;
    });
});
