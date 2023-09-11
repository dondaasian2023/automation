import element from 'src/element';
import milliseconds from 'src/utils/milliseconds';
import { DEFAULT_WAIT_TIMEOUT } from 'config/settings';

const SELECTORS = {
    TITLE: {
        PREV_CONTEXT: '~components_navbar_title_prev_context',
        CONTEXT: '~components_navbar_title_context',
    },
};

async function isPageOpened(prevContext, context) {
    const isExpectedPrevContextOpened = await isPrevContextOpened(prevContext);
    const isExpectedContextOpened = await isContextOpened(context);

    return isExpectedPrevContextOpened && isExpectedContextOpened;
}

async function waitForPageOpened(prevContext, context) {
    return browser.waitUntil(
        async () => (
            (await isPageOpened(prevContext, context)) === true,
            {
                timeout: milliseconds.seconds(5),
                timeoutMsg: `Previous context "${prevContext}" and Context "${context}" - did not open.`,
                interval: milliseconds.seconds(0.5),
            }
        )
    );
}

async function isPrevContextOpened(prevContext) {
    const currentPrevContext = await element(SELECTORS.TITLE.PREV_CONTEXT).getElementText();

    return currentPrevContext === prevContext;
}

async function waitForPrevContextOpened(prevContext) {
    const isOpened = await isPrevContextOpened(prevContext);
    if (!isOpened) {
        throw Error(`Previous context "${prevContext}" - did not open.`);
    }
}

async function waitForContextOpened(context, timeout = DEFAULT_WAIT_TIMEOUT) {
    const isOpened = await isContextOpened(context, timeout);
    if (!isOpened) {
        throw Error(`Context "${context}" - did not open.`);
    }
}

async function isContextOpened(expectedContext, timeout = milliseconds.seconds(5)) {
    return browser.waitUntil(
        async () => (await element(SELECTORS.TITLE.CONTEXT).getElementText()) === expectedContext,
        {
            timeout,
            timeoutMsg: `Expected context to be ${expectedContext}`,
            interval: milliseconds.seconds(0.5),
        }
    );
}

function getContextText() {
    return element(SELECTORS.TITLE.CONTEXT).getElementText();
}

const NavBarTitle = {
    isContextOpened,
    isPrevContextOpened,
    isPageOpened,
    waitForContextOpened,
    waitForPrevContextOpened,
    waitForPageOpened,
    getContextText,
};

export default NavBarTitle;
