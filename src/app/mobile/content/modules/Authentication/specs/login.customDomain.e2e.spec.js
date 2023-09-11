import theme from 'src/services/theme';
import AuthActions from 'src/app/mobile/actions/authActions';
import Context from 'src/services/driver/context';
import { expect } from 'chai';
import { resetApp, sleep } from 'src/services/driver/driverActions';
import { LOGIN_PORTAL_START_URL_PATH } from 'src/constants/endpoints';
import Main from 'src/app/mobile/content/core/pages/main';
import { PAGE_NAMES } from 'src/constants/navigation';
import description from 'src/services/reporting/description';

// TODO: Remove and create test account
const CUSTOM_DOMAIN = {
    DOMAIN: 'intappsmoketestus',
    EMAIL: 'richard.lee@intapp.com',
    PASSWORD: 'DealCloud123!',
};

if (theme.isDC) {
    describe.skip;
} else {
    describe(description.applyEnv('Custom Domain feature'), async () => {
        beforeEach(async () => {
            await resetApp();
        });

        it('With custom domain feature should be successful', async () => {
            await AuthActions.skipOnboardingScreens();
            await Context.switchToContextByParams({ url: LOGIN_PORTAL_START_URL_PATH });

            await AuthActions.loginWithCustomDomain(CUSTOM_DOMAIN);

            await sleep(5000);
            await Context.switchToNativeApp();

            expect(
                await Main.isTabDisplayed(PAGE_NAMES.MORE),
                'User should be logged in application'
            ).to.be.true;
        });
    });
}
