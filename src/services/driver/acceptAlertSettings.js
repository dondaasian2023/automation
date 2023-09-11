const DEFAULT_SELECTOR = "**/XCUIElementTypeButton[`label == 'Allow While Using App'`]";

export const setAcceptAlertButtonSelector = async (selector = DEFAULT_SELECTOR) => {
    if (driver.isIOS) {
        await driver.updateSettings({
            acceptAlertButtonSelector: selector,
        });
    }
};
