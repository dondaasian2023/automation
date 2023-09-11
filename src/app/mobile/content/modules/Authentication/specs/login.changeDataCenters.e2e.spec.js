import LoginPage from 'src/app/mobile/content/modules/Authentication/MainLoginWebView/pages/loginPage';
import LoginSettingsPage from 'src/app/mobile/content/modules/Authentication/LoginSettings/loginSettingsPage';
import { expect } from 'chai';
import { DATA_CENTER } from 'src/app/mobile/content/modules/Authentication/LoginSettings/constants';
import AuthActions from 'src/app/mobile/actions/authActions';
import { addStep } from 'src/services/reporting/allure';
import description from 'src/services/reporting/description';

describe(description.applyEnv('Change Data centers'), async () => {
    before(async () => {
        await AuthActions.skipOnboardingScreens();
    });

    it('(EU/US/APACSEA) should be successful', async () => {
        await LoginPage.clickSettings();
        for (const { NAME, ABBREVIATION } of Object.values(DATA_CENTER)) {
            await LoginSettingsPage.changeDataCenter(NAME);
            await LoginPage.clickSettings();
            const currentDataCenter = await LoginSettingsPage.getCurrentDataCenter();
            validateDataCenter(currentDataCenter, ABBREVIATION);
        }
    });
});

function validateDataCenter(actual, expected) {
    addStep(`Current data center should be: ${expected}`);
    expect(actual).to.eql(`Data Center: ${expected}`);
}
