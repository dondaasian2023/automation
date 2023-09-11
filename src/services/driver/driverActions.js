import { logger } from 'src/utils/logger';

const getContext = () => driver.getContext();
const getContexts = () => driver.getContexts();
const getUrl = () => driver.getUrl();
const getTitle = () => driver.getTitle();
const getWindowSize = () => driver.getWindowSize();

async function switchContext(contextID) {
    await driver.switchContext(contextID);
}

async function sleep(ms = 500) {
    logger.debug(`Sleeping for ${ms} ms`);
    await driver.pause(ms);
}

async function setSnapshotMaxDepth(value) {
    if (driver.isIOS) {
        logger.debug(`Update "snapshotMaxDepth" : ${value}`);
        await driver.updateSettings({ snapshotMaxDepth: value });
    }
}

async function takeScreenshot() {
    logger.debug('Taking screenshot...');
    await driver.takeScreenshot();
}

async function hideKeyboard(strategy) {
    logger.debug(`Hide keyboard by ${strategy}`);
    await driver.hideKeyboard(strategy);
}

async function resetApp() {
    logger.debug('Resetting application...');
    await driver.launchApp();
}

async function executeMobile(script, args) {
    logger.debug(`Execute "mobile:${script}", args: ${JSON.stringify(args, null, 2)}`);
    return driver.execute(`mobile:${script}`, args);
}

async function fingerPrint(fingerPrintId) {
    logger.debug(`Finger print: ${fingerPrintId}`);
    await driver.pause(1500);
    await driver.fingerPrint(fingerPrintId);
}

export {
    setSnapshotMaxDepth,
    takeScreenshot,
    resetApp,
    getContext,
    getContexts,
    getUrl,
    switchContext,
    getTitle,
    sleep,
    hideKeyboard,
    getWindowSize,
    executeMobile,
    fingerPrint,
};
