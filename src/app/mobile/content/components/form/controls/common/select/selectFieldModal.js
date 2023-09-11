import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import { logger } from 'src/utils/logger';
import ActionBarButton, { LABEL } from 'src/app/mobile/content/components/actionBarButton';
import SelectEntryPage from 'src/app/mobile/content/modules/EntryFormEditor/components/ListSelection/selectEntryPage';
import TOUCH_ACTIONS from 'src/services/driver/touchActions';
import { hideKeyboard, sleep } from 'src/services/driver/driverActions';

const SELECTORS = {
    SELECT_OPTION_LINE: 'components_form_select_select-option-line-{item}',
    SELECT_SEARCH_INPUT: '~components_form_select_select-search-input',
};

const ELEMENT_NAME = 'Select Search Input';

async function selectItem(item) {
    if (!item) {
        logger.warn(`${ELEMENT_NAME} - Missed item to select`);
        return;
    }
    await searchItem(item);
}

async function createItem(handleEntryFormOpened, listName) {
    await sleep(2000);

    if (listName) {
        await SelectEntryPage.waitForOpened();
        await SelectEntryPage.selectEntry(listName);
    }

    await handleEntryFormOpened?.();

    if (driver.isAndroid) {
        await hideKeyboard(TOUCH_ACTIONS.TAP_OUTSIDE);
    }
    await ActionBarButton(LABEL.SAVE).clickElement();
}

async function searchItem(item) {
    const itemToBeFounded = element(cookTestID(SELECTORS.SELECT_OPTION_LINE, { item }));
    if (await itemToBeFounded.isElementDisplayed()) {
        await itemToBeFounded.clickElement();
    } else {
        throw Error(`Item "${item}" was not found`);
    }
}

const SelectFieldModal = {
    selectItem,
    createItem,
};
export default SelectFieldModal;
