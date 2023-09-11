import env from 'src/services/environment';
import AuthActions from 'src/app/mobile/actions/authActions';
import SettingsPage, {
    SETTINGS_MENU_ITEMS,
} from 'src/app/mobile/content/modules/Settings/pages/settingsPage';
import ChangePasswordPage from 'src/app/mobile/content/modules/Settings/pages/ChangePasswordPage/changePasswordPage';
import { expect } from 'chai';
import PASSWORD_TOOLTIPS from 'src/app/mobile/content/modules/Settings/pages/ChangePasswordPage/constants/passwordTooltips';
import ERROR_MESSAGES from 'src/app/mobile/content/modules/Settings/pages/ChangePasswordPage/constants/errorMessages';
import { STATES } from 'src/app/mobile/content/modules/Settings/pages/ChangePasswordPage/components/passwordTooltip';
import { addStep } from 'src/services/reporting/allure';
import description from 'src/services/reporting/description';
import allureReporter from '@wdio/allure-reporter';
import { STATUS_CODE_ERROR_MESSAGES } from 'src/app/mobile/content/core/api/apiConstants';
import { navigateToSettings } from 'src/app/mobile/actions/mainActions';

const {
    USERS: [USER],
} = env.default;

const { PASSWORD_DO_NOT_MATCH } = ERROR_MESSAGES;

const PASSWORDS = {
    CURRENT: {
        CORRECT: USER.PASSWORD,
        INCORRECT: 'Ii37dd28300jjjj!',
    },
    NEW: {
        CORRECT: 'Re1234gggg789!',
        INCORRECT: 'Rr12kiw56789-',
        SYMBOLS_COMBINATION_NOT_MEETING_REQUIREMENTS: [
            'rr12kiw56789-',
            'RR12KIW56789-',
            'jjjdjdUdjdjjJj-',
            'jjjdjdUdjdjjJj988',
            'Ikjhdkiue8!',
        ],
    },
};
// TODO: enable test for iOS when snapshot issue is resolved
if(driver.isIOS) {
    describe.skip;
} else {
    describe(description.applyEnv('Settings'), async function () {

        describe('Change Password', async function () {
            before('Open "Settings" - "Change Password"', async () => {
                await AuthActions.skipOnboardingScreens();
                await AuthActions.loginToApplication(USER);
                await navigateToSettings();
                await SettingsPage.tap(SETTINGS_MENU_ITEMS.CHANGE_PASSWORD_BUTTON);
                await ChangePasswordPage.waitForOpened();
            });

            it('Error message should be displayed when value in "Current Password" input is incorrect', async () => {
                allureReporter.addIssue('PMA-923');
                await ChangePasswordPage.changePassword(
                    PASSWORDS.CURRENT.INCORRECT,
                    PASSWORDS.NEW.CORRECT
                );

                const actualCheckboxesState = [];
                for (const name of Object.values(PASSWORD_TOOLTIPS)) {
                    const state = await ChangePasswordPage.getCheckBoxValue(name);
                    actualCheckboxesState.push({name, state});
                }

                await ChangePasswordPage.clickChangePassword();
                const errorMessageText = await ChangePasswordPage.getErrorMessageText();

                const expectedState = driver.isIOS ? STATES.IOS.CHECKED : STATES.ANDROID.TRUE;

                actualCheckboxesState.forEach(checkBox => {
                    expect(!!checkBox.state).to.eq(
                        expectedState,
                        `Checkbox '${checkBox.name}' should be checked`
                    );
                });

                expect(errorMessageText).to.eq(STATUS_CODE_ERROR_MESSAGES['400']);
            });

            it(`Error message should be displayed when value in "Confirm New Password" is incorrect`, async () => {
                await ChangePasswordPage.changePassword(
                    PASSWORDS.CURRENT.CORRECT,
                    PASSWORDS.NEW.CORRECT,
                    PASSWORDS.NEW.INCORRECT
                );

                await ChangePasswordPage.clickChangePassword();

                await expectChangePasswordDisabled();
                await expectErrorMessageVisible();
            });

            PASSWORDS.NEW.SYMBOLS_COMBINATION_NOT_MEETING_REQUIREMENTS.forEach(password => {
                it(`"Change Password" button should be disabled when new Password = ${password}`, async () => {
                    await ChangePasswordPage.changePassword(
                        PASSWORDS.CURRENT.CORRECT,
                        password,
                        password
                    );

                    await expectChangePasswordDisabled();
                });
            });
        });
    });
}

async function expectChangePasswordDisabled() {
    const message = 'Change Password" button should be disabled';
    addStep(message);
    const isChangePasswordBtnEnabled =
        await ChangePasswordPage.getChangePasswordButton().isElementEnabled({
            reverse: true,
        });

    expect(isChangePasswordBtnEnabled, message).to.be.true;
}

async function expectErrorMessageVisible() {
    const message = `Error message under Confirm New Password field: 
            "${PASSWORD_DO_NOT_MATCH}" should be displayed`;
    addStep(message);
    const isErrorMessageVisible =
        await ChangePasswordPage.passwordsDoNotMatchErrorMessageIsVisible();
    expect(isErrorMessageVisible, message).to.be.true;
}
