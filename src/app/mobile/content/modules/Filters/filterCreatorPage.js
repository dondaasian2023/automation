import { cookTestID } from 'src/services/cookTestID';
import SearchInput from 'src/app/mobile/content/components/searchInput';

// TODO: Error with Accessing page content when using deeply nested React Navigation navigators
//     on iOS Using Appium
//     Github issue: https://github.com/appium/appium/issues/10654
const SELECTORS = {
    FILTER_LIST_ITEM: 'filters_filter-creator-filter-list-item_{filterName}',
};

async function selectFieldForFilter(filterName) {
    const testID = cookTestID(SELECTORS.FILTER_LIST_ITEM, { filterName });
    await SearchInput.searchItem(filterName, testID);
}

const FilterCreatorPage = { selectFieldForFilter };
export default FilterCreatorPage;
