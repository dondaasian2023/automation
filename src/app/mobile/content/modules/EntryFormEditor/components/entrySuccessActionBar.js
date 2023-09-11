import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import ActionBarButton from 'src/app/mobile/content/components/actionBarButton';
import { addStep } from 'src/services/reporting/allure';
import milliseconds from 'src/utils/milliseconds';

const SELECTORS = {
    SUCCESSFULLY_MESSAGE_LABEL:
        'feature_entry-success_entry-success-content-{list}-successfully-added.',
    CLOSE: '~components_search-close',
};

const close = async () => element(SELECTORS.CLOSE).clickElement();

async function isSuccessfullyMessageDisplayed(list) {
    return element(
        cookTestID(SELECTORS.SUCCESSFULLY_MESSAGE_LABEL,{ list })
    ).isElementDisplayed({ timeout: milliseconds.seconds(50) });
}

async function clickAddAnother() {
    const title = 'Add another';
    await clickActionBarButton(title);
}

async function clickActionBarButton(title) {
    addStep(`Click ${title}`);
    const viewEntryButton = ActionBarButton(title);
    await viewEntryButton.isElementEnabled({ timeoutMs: 5000 });
    await viewEntryButton.clickElement();
}

const EntrySuccessActionBar = {
    isSuccessfullyMessageDisplayed,
    close,
    clickAddAnother,
};
export default EntrySuccessActionBar;
