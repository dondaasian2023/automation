import { PAGE_NAMES } from 'src/constants/navigation';
import SearchInput from 'src/app/mobile/content/components/searchInput';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { addStep } from 'src/services/reporting/allure';

async function openList(name) {
    addStep(`Open list: ${name}`);
    await SearchInput.searchListItem(name);
}

async function waitForOpened() {
    await NavBar.waitForContextOpened(PAGE_NAMES.OBJECTS);
}

const ListsList = { openList, waitForOpened };
export default ListsList;
