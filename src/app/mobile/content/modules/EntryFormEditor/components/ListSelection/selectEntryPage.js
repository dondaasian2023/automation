import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import SearchInput from 'src/app/mobile/content/components/searchInput';

async function selectEntry(entryType) {
    await SearchInput.searchItem(entryType);
}

async function waitForOpened() {
    await NavBar.waitForContextOpened('Entry Forms');
}

const SelectEntryPage = {
    selectEntry,
    waitForOpened,
};
export default SelectEntryPage;
