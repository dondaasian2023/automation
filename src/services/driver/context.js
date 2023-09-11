import { logger } from 'src/utils/logger';
import isUndefined from 'src/utils/types/isUndefined';
import {
    getContext,
    getContexts,
    getTitle,
    getUrl,
    switchContext,
} from 'src/services/driver/driverActions';
import milliseconds from 'src/utils/milliseconds';

const CONTEXT_REF = {
    NATIVE: 'NATIVE_APP',
    WEBVIEW: 'webview',
};
const DOCUMENT_READY_STATE = {
    COMPLETE: 'complete',
    INTERACTIVE: 'interactive',
    LOADING: 'loading',
};

const POLLING_INTERVAL_MS = 100;

async function waitForWebViewContextLoaded() {
    await driver.waitUntil(
        async () => {
            const currentContextsIds = await getContexts();

            return (
                currentContextsIds.length > 1 &&
                !isUndefined(
                    currentContextsIds.find(context => {
                        return context.toLowerCase().includes(CONTEXT_REF.WEBVIEW);
                    })
                )
            );
        },
        {
            timeout: milliseconds.seconds(60),
            timeoutMsg: 'Webview context not loaded',
            interval: POLLING_INTERVAL_MS,
        }
    );
}

async function switchToContext(contextID) {
    logger.debug(`Switching to ${contextID.toUpperCase()}`);
    await switchContext(contextID);
}

async function switchToNativeApp() {
    const currentContexts = await getContexts();
    const nativeApp = currentContexts.find(context => {
        return context === CONTEXT_REF.NATIVE;
    });
    await switchToContext(nativeApp);
}

async function waitForDocumentFullyLoaded() {
    const pageUrl = await getUrl();
    await driver.waitUntil(
        async () =>
            (await driver.execute(() => document.readyState)) === DOCUMENT_READY_STATE.COMPLETE,
        {
            timeout: milliseconds.seconds(15),
            timeoutMsg: `Website ${pageUrl} not loaded`,
            interval: POLLING_INTERVAL_MS,
        }
    );
}

// TODO: add doc here
/**
 *
 * @param params
 * @param strictEquality
 * @param reverse
 * @returns {Promise<void>}
 */
async function switchToContextByParams(
    params = {},
    { strictEquality = true, reverse = false } = {}
) {
    if (!params) {
        return;
    }

    const availableContexts = await getAvailableContexts();
    let context;

    Object.entries(params).forEach(([key, value]) => {
        const contexts = strictEquality
            ? availableContexts.filter(context => context[key] === value)
            : availableContexts.filter(context => context[key].includes(value));

        if (!contexts.length) {
            throw Error(
                `Cannot find context with ${JSON.stringify(
                    params
                )}\nAvailable contexts : ${JSON.stringify(availableContexts)}`
            );
        }

        if (contexts.length > 1) {
            context = reverse ? contexts.shift() : contexts.pop;
        } else {
            context = contexts[0];
        }
    });

    const { id } = context;
    await switchToContext(id);
    if (id.toLowerCase().includes(CONTEXT_REF.WEBVIEW)) {
        await waitForDocumentFullyLoaded();
    }
}

async function getAvailableContexts() {
    const currentContext = await getContext();
    await waitForWebViewContextLoaded();
    const availableContexts = await getContexts();

    const contexts = await Promise.all(
        availableContexts.map(async context => {
            let title = '';
            let url = '';
            const id = context;

            if (id !== CONTEXT_REF.NATIVE) {
                await switchToContext(context);
                const pageTitle = await getTitle();
                url = await getUrl();
                title = pageTitle ?? 'No page title available';
            }

            return {
                id,
                title,
                url,
            };
        })
    );

    logger.debug(`Available contexts : ${JSON.stringify(contexts)}`);
    await switchToContext(currentContext);

    return contexts;
}

const Context = {
    switchToContextByParams,
    switchToNativeApp,
};

export default Context;
