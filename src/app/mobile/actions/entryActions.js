import SelectEntryPage from 'src/app/mobile/content/modules/EntryFormEditor/components/ListSelection/selectEntryPage';
import Main from 'src/app/mobile/content/core/pages/main';
import EntryFormContainer from 'src/app/mobile/content/modules/EntryFormEditor/components/EntryFormContainer/EntryFormContainer';
import TOUCH_ACTIONS from 'src/services/driver/touchActions';
import { hideKeyboard, sleep } from 'src/services/driver/driverActions';
import { addStep } from 'src/services/reporting/allure';
import EntrySuccessActionBar from 'src/app/mobile/content/modules/EntryFormEditor/components/entrySuccessActionBar';
import GridWidgetPage from 'src/app/mobile/content/modules/Widget/GridWidget/gridWidgetPage';
import { NEXT_BUTTON_DIRECTIONS } from 'src/app/mobile/content/modules/Widget/GridWidget/compoments/DataTable/tableHeader';
import { openList } from 'src/app/mobile/actions/listActions';
import { PAGE_NAMES } from 'src/constants/navigation';

const CREATED_DATE_TABLE_HEADER = 'Created Date';

async function createNewEntry(listName, fillEntryFieldsCallback) {
    addStep(`Create entry in list: ${listName}`);
    await openEntryForm(listName);

    await sleep(2000);
    if (driver.isAndroid) {
        await hideKeyboard(TOUCH_ACTIONS.TAP_OUTSIDE);
    }
    if (fillEntryFieldsCallback) {
        await fillEntryFieldsCallback?.();
        await EntryFormContainer.save();
    }
}

async function openEntryForm(listName) {
    addStep(`Open entry form, list: "${listName}"`);
    await Main.createNewEntry();
    await SelectEntryPage.waitForOpened();
    await SelectEntryPage.selectEntry(listName);
}

async function openEntryByName(sourceListName, entryName, shouldFindByCreatedDate = false) {
    addStep(`Open entry ${entryName} in list: ${sourceListName}`);
    await EntrySuccessActionBar.close();
    await Main.navigate(PAGE_NAMES.MORE);

    await openList(sourceListName);

    if (shouldFindByCreatedDate) {
        await GridWidgetPage.DataTable.TableHeader.clickNextUntilColumnHeaderDisplayed(
            CREATED_DATE_TABLE_HEADER,
            NEXT_BUTTON_DIRECTIONS.RIGHT
        ).then(header => header.clickElement());
    }

    await GridWidgetPage.clickToggleButton();
    await GridWidgetPage.openCard(entryName);
    // TODO: Investigate possible options to get IntAppID for validation of opened context.
    //await DetailGridWidget.waitForOpened('', entryName);
}

const entryActions = { createNewEntry, openEntryByName, openEntryForm };
export default entryActions;
