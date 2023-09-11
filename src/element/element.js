import { getSelectorByPlatformName } from 'src/element/getSelectorByPlatformName';
import { DEFAULT_WAIT_TIMEOUT } from 'config/settings';
import { logger } from 'src/utils/logger';
import TOUCH_ACTIONS from 'src/services/driver/touchActions';
import { sleep } from 'src/services/driver/driverActions';

const { TAP } = TOUCH_ACTIONS;

export default function element(selectorObj) {
    const selector = getSelectorByPlatformName(selectorObj);

    async function findDisplayedElement() {
        try {
            const el = await $(selector);
            const isElementDisplayed = await el.waitForDisplayed({ DEFAULT_WAIT_TIMEOUT });
            if (isElementDisplayed) {
                return el;
            }
        } catch (error) {
            logger.error(`"${selector}" - Didn't appear in ${DEFAULT_WAIT_TIMEOUT} ms`);
            throw Error(error);
        }
    }

    async function findElements() {
        return $$(selector);
    }

    async function tapElement() {
        const element = await findDisplayedElement();
        logger.debug(`"${selector}" - Tap`);
        await element.touchAction(TAP);
    }

    async function clickElement(times = 1) {
        const element = await findDisplayedElement();
        for (let i = 0; i < times; i++) {
            logger.debug(`"${selector}" - Click`);

            await element.click();
            await sleep(300);
        }
    }

    async function setValue(value) {
        const element = await findDisplayedElement();
        logger.debug(`"${selector}" - Set value '${value}'`);
        await element.setValue(value);
    }

    async function clearValueByBackspaces() {
        const element = await findDisplayedElement();
        logger.debug(`"${selector}" - Clear value by backspaces`);
        const value = await element.getValue();
        if (value) {
            const backSpaces = new Array(value.length).fill('Backspace');
            await element.setValue(backSpaces);
        }
    }

    async function isElementDisplayed(
        { timeout = DEFAULT_WAIT_TIMEOUT, reverse = false } = {
            timeout: DEFAULT_WAIT_TIMEOUT,
            reverse: false,
        }
    ) {
        logger.debug(`"${selector}" - Waiting to be ${reverse ? 'hidden' : 'visible'}`);
        let timeoutMsg = reverse ? 'Still displayed' : `Didn't appear in ${timeout} ms`;
        const uiElement = await $(selector);

        try {
            return await uiElement.waitForDisplayed({
                timeout,
                reverse,
                timeoutMsg,
            });
        } catch (error) {
            logger.error(`"${selector}" - ${timeoutMsg}.`);
            return false;
        }
    }

    async function isElementEnabled({ timeoutMs = DEFAULT_WAIT_TIMEOUT, reverse = false } = {}) {
        logger.debug(`"${selector}" - Waiting to be ${reverse ? 'disabled' : 'enabled'}`);
        let errorMessage = reverse ? 'Still enabled' : `Didn't enabled in ${timeoutMs} ms`;

        try {
            const element = await findDisplayedElement();
            return await element.waitForEnabled({
                timeout: timeoutMs,
                reverse: reverse,
                timeoutMsg: errorMessage,
            });
        } catch (error) {
            logger.error(`"${selector}" - ${errorMessage}.\nOriginal error: ${error}`);
            return false;
        }
    }

    async function getElementText() {
        logger.debug(`"${selector}" - Get text`);
        const text = await $(selector).then(e => e.getText());
        logger.debug(`"${selector}" - Text is '${text}'`);
        return text;
    }

    async function tapUntilPresent(timeout = DEFAULT_WAIT_TIMEOUT) {
        const start = Date.now();
        logger.debug(`"${selector}" - Tapping until present`);

        const element = await findDisplayedElement(selector);
        while (await element.isDisplayed()) {
            try {
                logger.debug(`"${selector}" - Still present. Tapping again`);
                await element.touchAction(TAP);
            } catch (error) {
                logger.error(`"${selector}" - Not found`);
                break;
            }
            const now = Date.now();
            if (now - start > timeout) {
                throw Error(`"${selector}" - Element is still present after ${timeout} ms`);
            }
        }
    }

    async function getElementAttribute(attributeName) {
        const element = await findDisplayedElement();
        logger.debug(`"${selector}" - get '${attributeName}' attribute value`);
        return element.getAttribute(attributeName);
    }

    return {
        findElements,
        tapElement,
        clickElement,
        clearValueByBackspaces,
        setValue,
        isElementDisplayed,
        isElementEnabled,
        getElementText,
        getElementAttribute,
        tapUntilPresent,
    };
}
