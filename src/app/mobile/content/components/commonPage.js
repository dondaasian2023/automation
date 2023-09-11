import element from 'src/element';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import milliseconds from 'src/utils/milliseconds';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';

const PAGE_LOAD_TIMEOUT = milliseconds.seconds(50);

export default function commonPage(pageID, pageName) {
    return {
        waitForOpened: () => waitForOpened(pageID, pageName),
        isOpened: () => isPageOpened(pageID, pageName),
        isClosed: () => isPageClosed(pageID, pageName),
        ...NavBar,
    };
}

function isPageOpened(pageID) {
    return element(pageID).isElementDisplayed({ timeout: PAGE_LOAD_TIMEOUT });
}

function isPageClosed(pageID) {
    return element(pageID).isElementDisplayed({
        timeout: PAGE_LOAD_TIMEOUT,
        reverse: true,
    });
}

async function waitForOpened(pageID, pageName) {
    const isOpened = await isPageOpened(pageID, pageName, PAGE_LOAD_TIMEOUT);
    if (!isOpened) {
        throw Error(
            `Page "${pageName}" - did not open in ${PAGE_LOAD_TIMEOUT} ms.\nPageID='${pageID}'`
        );
    }
}

export const allowLocationServices = async () => {
    if (driver.isIOS) {
        const isLocationAlertShown = await NativeAlert.isShown();
        if (isLocationAlertShown) {
            await NativeAlert.pressButton('Allow While Using App');
        }
    }
};
