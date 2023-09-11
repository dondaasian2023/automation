import { resetApp } from 'src/services/driver/driverActions';

require('dotenv').config();
import theme from 'src/services/theme';
import env from 'src/services/environment';
import AuthActions from 'src/app/mobile/actions/authActions';
import { PAGE_NAMES } from 'src/constants/navigation';
import { expect } from 'chai';
import Main from 'src/app/mobile/content/core/pages/main';
import userService from 'src/services/userService';
import description from 'src/services/reporting/description';
import { logOutFromApplication } from 'src/app/mobile/actions/settingsActions';

if (theme.isOP || env.isQA) {
    describe.skip(
        'Login to multiple clients implemented only for DC QA2 and not supported for OP theme at all.'
    );
} else {
    describe(description.applyEnv('Login'), async () => {
        const [USER] = userService.getUsersWithMultipleClients();
        const [{ TEXT: CLIENT_1 }, { TEXT: CLIENT_2 }] = userService.getUserClients(USER);

        before('Navigate to Login Screen', async () => {
            await resetApp();
            await AuthActions.skipOnboardingScreens();
        });

        it('To multiple clients should be successful', async () => {
            await AuthActions.loginToApplication(USER, {
                clientName: CLIENT_1,
            });

            await logOutFromApplication();
            await AuthActions.loginToApplication(USER, {
                clientName: CLIENT_2,
            });

            expect(
                await Main.isTabDisplayed(PAGE_NAMES.MORE),
                'User should be logged in application'
            ).to.be.true;
        });
    });
}
