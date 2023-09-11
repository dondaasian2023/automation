import commonPage from 'src/app/mobile/content/components/commonPage';
import element from 'src/element';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { swipeUp } from 'src/services/driver/gestures/swipeToElement';
import { cookResourceId, cookTestID } from 'src/services/cookTestID';
import { setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import { SNAPSHOT_DEPTH_MAX_VALUE_100 } from 'config/settings';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';

export const SETTINGS_MENU_ITEMS = {
    LOG_OUT_BUTTON: '~navigation-header-button_navigation-header-logout',
    PUSH_NOTIFICATIONS_BUTTON: '~settings_settings-page_push-notifications',
    CHANGE_PASSWORD_BUTTON: '~settings_settings-page_change-password',
    SWITCH_SITES_BUTTON: '~settings_settings-page_switch-sites',
    USE_PIN_CODE: '~components_switch-use-pin-code',
    USE_BIOMETRIC: {
        STATE: 'pma_settings_biometric-item_has-biometric-{hasBiometric}_is-disabled-{isDisabled}',
        ITEM: '~components_switch-use-biometrics',
    },
};

const DEFAULT_BIOMETRIC_SETTINGS = { hasBiometric: false, isDisabled: false };
const DEFAULT_PIN_SETTINGS = { hasPin: false, pinDisabled: false };

async function useBiometrics({ hasBiometric, isDisabled } = DEFAULT_BIOMETRIC_SETTINGS) {
    const stateTestID = cookTestID(SETTINGS_MENU_ITEMS.USE_BIOMETRIC.STATE, {
        hasBiometric: hasBiometric.toString(),
        isDisabled: isDisabled.toString(),
    });
    return element(stateTestID);
}

async function tap(testID) {
    await element(testID).tapElement();
}

async function logOut() {
    await swipeUp();
    await element(SETTINGS_MENU_ITEMS.LOG_OUT_BUTTON).tapElement();
    await NativeAlert.pressYes();
}

async function getUsePinCode({ hasPin, isDisabled } = DEFAULT_PIN_SETTINGS) {
    await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);
    const selector = 'pma_settings_pin-code-item_has-pin-{hasPin}_is-disabled-{isDisabled}';
    const cookSelector = driver.isIOS ? cookTestID : cookResourceId;
    const testID = cookSelector(selector, {
        hasPin: hasPin.toString(),
        isDisabled: isDisabled.toString(),
    });
    return element(testID);
}

const SettingsPage = {
    ...commonPage(SETTINGS_MENU_ITEMS.LOG_OUT_BUTTON, 'Settings Page'),
    tap,
    NavBar,
    getUsePinCode,
    useBiometrics,
    logOut,
};
export default SettingsPage;
