import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import OptionMenu from 'src/app/mobile/content/components/OptionsMenu/optionMenu';

const SELECTOR = '~components_search-input';

const ITEMS = {
    LIST_ITEM_BUTTON: 'lists_list_item_{label}',
};

const searchInputElement = element(SELECTOR);

async function search(label, element) {
    await setValue(label);
    if (await element.isElementDisplayed()) {
        await element.tapUntilPresent();
    } else {
        throw Error(`Cannot find item in Search Input: Item = "${label}"`);
    }
}

async function setValue(value) {
    await searchInputElement.setValue(value);
}

async function searchItem(value) {
    await search(value, OptionMenu.getTitle(value));
}

async function searchListItem(label) {
    const listItemElement = element(cookTestID(ITEMS.LIST_ITEM_BUTTON, { label }));
    await search(label, listItemElement);
}

async function clear() {
    await searchInputElement.clickElement();
    await element('~components_search-close', 'Search Close').clickElement();
}

const SearchInput = { searchItem, searchListItem, setValue, clear };
export default SearchInput;
