import { cookTestID } from 'src/services/cookTestID';
import element from 'src/element';

const ELEMENTS = {
    SECTION_ITEM_HEADER_LABEL:
        'search_quick-search_search-results_section-item-header_{itemHeader}',
    SECTION_ITEM_LABEL: 'search_quick-search_search-results_section-item_{item}',
};

function getSectionItemHeader(itemHeader) {
    const testID = cookTestID(ELEMENTS.SECTION_ITEM_HEADER_LABEL, { itemHeader });
    return element(testID, `Section Item Header: ${itemHeader}`);
}

function getSectionItem(item) {
    const testID = cookTestID(ELEMENTS.SECTION_ITEM_LABEL, { item });
    return element(testID, `Section Item: ${item}`);
}

async function selectItem(item) {
    await getSectionItem(item).clickElement();
}

const SearchResults = { getSectionItemHeader, getSectionItem };
export default SearchResults;
