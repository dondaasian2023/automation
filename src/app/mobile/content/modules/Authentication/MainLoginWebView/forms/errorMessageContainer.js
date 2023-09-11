import element from 'src/element';
import { sleep } from 'src/services/driver/driverActions';

const SELECTORS = {
    ERROR_MESSAGE_LABEL: '//span[@data-qa-id="error_message"] | //span[@class="kc-feedback-text"]',
};

async function getErrorMessage() {
    await sleep(2000);
    return element(SELECTORS.ERROR_MESSAGE_LABEL).getElementText();
}

async function isErrorMessageDisplayed(text) {
    return element(`${SELECTORS.ERROR_MESSAGE_LABEL}[text(), "${text}"]`).isElementDisplayed();
}

const ErrorMessageContainer = {
    getErrorMessage,
    isErrorMessageDisplayed,
};

export default ErrorMessageContainer;
