import element from 'src/element';
import TOUCH_ACTIONS from 'src/services/driver/touchActions';
import { hideKeyboard } from 'src/services/driver/driverActions';

const ELEMENTS = {
    DONE: {
        ios: '//XCUIElementTypeButton[@name="Done"]',
    },
};

export default async function hideKeyboardByClickingDone() {
    if (await driver.isKeyboardShown()) {
        if (driver.isIOS) {
            await element(ELEMENTS.DONE).clickElement();
        } else {
            await hideKeyboard(TOUCH_ACTIONS.TAP_OUTSIDE);
        }
    }
}
