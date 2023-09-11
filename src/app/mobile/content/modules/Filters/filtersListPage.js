import element from 'src/element';
import BottomActionButton from 'src/app/mobile/content/components/bottomActionButton';

const SELECTORS = {
    CLEAR_ALL: element('~filters_filters-list_nav-clear-btn'),
    ADD_FILTER_BUTTON: '~filters_filters-list_add-filter-btn',
};

async function clickAddFilterBtn() {
    await element(SELECTORS.ADD_FILTER_BUTTON).clickElement();
}

const FiltersListPage = {
    clickAddFilterBtn,
    applyFilters: async () => await BottomActionButton.clickElement(),
};
export default FiltersListPage;
