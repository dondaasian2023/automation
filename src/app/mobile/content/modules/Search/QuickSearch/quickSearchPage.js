import TabHeader from 'src/app/mobile/content/features/pager/tabPager/tabHeader';
import SearchInput from 'src/app/mobile/content/components/searchInput';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import youHaveNoRecentSearchesIsDisplayed, {
    FavoritesEmptyScreen,
} from 'src/app/mobile/content/modules/Search/QuickSearch/components/quickSearchStub';
import SearchResults from 'src/app/mobile/content/modules/Search/QuickSearch/components/searchResults';
import OptionMenu from 'src/app/mobile/content/components/OptionsMenu/optionMenu';
import { QUICK_SEARCH_TABS } from 'src/app/mobile/content/modules/Search/QuickSearch/quickSearchConstants';
import { addStep } from 'src/services/reporting/allure';

async function clickRecentTab() {
    addStep(`Click "Recent" tab`);
    await TabHeader(QUICK_SEARCH_TABS.RECENT).clickElement();
}

async function clickFavoritesTab() {
    addStep(`Click "Favorites" tab`);
    await TabHeader(QUICK_SEARCH_TABS.FAVORITES).clickElement();
}

async function setInputValue(item) {
    await SearchInput.setValue(item);
}
async function isItemTitleInRecentSearches(title) {
    return OptionMenu.getTitle(title).isElementDisplayed();
}

async function waitForItemToBeDisplayedInSearchResults(item, itemHeader) {
    await SearchResults.getSectionItem(item).isElementDisplayed();
    await SearchResults.getSectionItemHeader(itemHeader).isElementDisplayed();
}

async function selectUsingSearch(item) {
    addStep(`Select using search: "${item}"`);
    await setInputValue(item);
    const sectionItem = await SearchResults.getSectionItem(item);
    await sectionItem.isElementDisplayed({ timeout: 70000 });
    await sectionItem.clickElement();
}

const QuickSearchPage = {
    FavoritesEmptyScreen,
    setInputValue,
    clickFavoritesTab,
    clickRecentTab,
    waitForItemToBeDisplayedInSearchResults,
    youHaveNoRecentSearchesIsDisplayed,
    selectUsingSearch,
    isItemTitleInRecentSearches,
    NavBar,
};
export default QuickSearchPage;
