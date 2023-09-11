import element from 'src/element';
import passwordTooltip from 'src/app/mobile/content/modules/Settings/pages/ChangePasswordPage/components/passwordTooltip';
import TextField from 'src/app/mobile/content/components/form/controls/textField';
import BottomActionButton from 'src/app/mobile/content/components/bottomActionButton';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { addStep } from 'src/services/reporting/allure';
import { setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import { SNAPSHOT_DEPTH_MAX_VALUE_100 } from 'config/settings';

const SELECTORS = {
    ERROR_MESSAGE: {
        STATIC: '~settings_change-password-error_message-static',
        PASSWORDS_DO_NOT_MATCH: '~settings_change-password-error_message-passwords_do_not_match',
    },
};

const PREV_CONTEXT = 'Settings';
const CONTEXT = 'Change Password';

async function changePassword(currentPassword, newPassword, confirmNewPassword) {
    await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);
    confirmNewPassword = confirmNewPassword ?? newPassword;
    addStep(
        `Set new password, current: "${currentPassword}", new: "${newPassword}", confirm: "${confirmNewPassword}"`
    );
    await TextField('Current Password').setValue(currentPassword);
    await TextField('New Password').setValue(newPassword);
    const confirmNewPasswordTextField = TextField('Confirm new Password');
    await confirmNewPasswordTextField.setValue(confirmNewPassword);
}

async function getErrorMessageText() {
    return element(SELECTORS.ERROR_MESSAGE.STATIC).getElementText();
}

async function passwordsDoNotMatchErrorMessageIsVisible() {
    return element(SELECTORS.ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH).isElementDisplayed();
}

async function getCheckBoxValue(text) {
    return passwordTooltip(text).getValue();
}

function getChangePasswordButton() {
    return BottomActionButton(CONTEXT);
}

async function clickChangePassword() {
    await getChangePasswordButton().clickElement();
}

async function waitForOpened() {
    await ChangePasswordPage.NavBar.waitForPageOpened(PREV_CONTEXT, CONTEXT);
}

const ChangePasswordPage = {
    NavBar,
    waitForOpened,
    changePassword,
    getErrorMessageText,
    passwordsDoNotMatchErrorMessageIsVisible,
    getCheckBoxValue,
    clickChangePassword,
    getChangePasswordButton,
};
export default ChangePasswordPage;
