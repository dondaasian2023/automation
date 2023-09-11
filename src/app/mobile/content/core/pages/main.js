import { cookTestID } from 'src/services/cookTestID';
import element from 'src/element';
import CreateEntryButton from 'src/app/mobile/content/core/pages/Main/components/createEntryButton';
import { addStep } from 'src/services/reporting/allure';

const MAIN_TAB = 'core_main_tab-{tabName}';

async function navigate(tabName) {
    addStep(`Tap tab: ${tabName}`);
    await getTab(tabName).clickElement();
}

function getTab(tabName) {
    const testID = cookTestID(MAIN_TAB, { tabName });
    return element(testID);
}

async function createNewEntry() {
    await CreateEntryButton.plusButton().isElementEnabled();
    await CreateEntryButton.plusButton().clickElement();
    if (!(await CreateEntryButton.entryFormButton().isElementDisplayed())) {
        await CreateEntryButton.plusButton().clickElement();
    }
    await CreateEntryButton.entryFormButton().clickElement();
}

async function isPlusButtonDisplayed({ timeout } = {}) {
    return CreateEntryButton.plusButton().isElementDisplayed({ timeout });
}

async function isTabDisplayed(tabName, timeout) {
    return getTab(tabName).isElementDisplayed({ timeout });
}

const Main = { navigate, createNewEntry, isPlusButtonDisplayed, isTabDisplayed };
export default Main;
