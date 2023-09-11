import { logger } from 'src/utils/logger';
import element from 'src/element';
import { addStep } from 'src/services/reporting/allure';

const SELECTORS = {
    ALERT: {
        ios: "-ios predicate string:type == 'XCUIElementTypeAlert'",
        android: 'id=android:id/alertTitle',
    },
    MESSAGE: {
        android: 'id=android:id/message',
    },
};

const NAME = 'Alert';

export const BUTTON = {
    CANCEL: 'Cancel',
    CONTINUE: 'Continue',
    TRY_AGAIN: 'Try again',
    OK: 'Ok',
    YES: 'Yes',
};

async function isShown(isShown = true) {
    logger.info(`Waiting for ${NAME} to be shown = ${isShown}`);

    return await element(SELECTORS.ALERT).isElementDisplayed({
        timeout: 3000,
        reverse: !isShown,
    });
}

async function waitForHidden() {
    return isShown(false);
}

function cookButton(buttonText) {
    const buttonSelector = {
        android: `//android.widget.Button[@text="${buttonText.toUpperCase()}"]`,
        ios: `~${buttonText}`,
    };
    return element(buttonSelector);
}

async function getAlertTitle() {
    if (!driver.isIOS) {
        return element(SELECTORS.ALERT.android).getElementText();
    }
}

async function getAlertMessage() {
    if (!driver.isIOS) {
        return element(SELECTORS.MESSAGE.android).getElementText();
    }
}

async function pressButton(buttonText) {
    addStep(`${NAME}. Press "${buttonText}"`);
    if (await isShown()) {
        await cookButton(buttonText).clickElement();
        await waitForHidden();
    }
}

async function pressTryAgain() {
    await pressButton(BUTTON.TRY_AGAIN);
}

async function pressContinue() {
    await pressButton(BUTTON.CONTINUE);
}

async function pressYes() {
    if (driver.isIOS) return;
    await pressButton(BUTTON.YES);
}

async function pressOk() {
    if (driver.isIOS) return;
    await pressButton(BUTTON.OK);
}

const NativeAlert = {
    pressContinue,
    pressTryAgain,
    pressOk,
    pressYes,
    pressButton,
    isShown,
    getAlertTitle,
    getAlertMessage,
};
export default NativeAlert;
