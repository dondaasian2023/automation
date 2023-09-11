import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { PAGE_NAMES } from 'src/constants/navigation';
import { sleep } from 'src/services/driver/driverActions';
import hideKeyboardByClickingDone from 'src/services/driver/gestures/hideKeyboardByClickingDone';
import EntityCardSmall from 'src/app/mobile/content/components/EntityCard/entityCardSmall';

const openDraft = async entryName => {
    await sleep(3000);
    const neededDraft = EntityCardSmall.getItem(entryName);
    // DEVNOTE: With a bad internet connection, it takes a long time for offline entries to be loaded
    await neededDraft.tapUntilPresent(50000);
    await hideKeyboardByClickingDone();
};

const waitForOpened = async () => {
    await NavBar.waitForContextOpened(PAGE_NAMES.DRAFTS_OFFLINE_ENTRIES);
};

const DraftsAndOfflineEntriesPage = { openDraft, waitForOpened };
export default DraftsAndOfflineEntriesPage;
