import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';

const SELECTORS = {
    OPTIONS_MENU_TITLE: 'core_components_entity-card-small-{title}',
    OPTIONS_MENU_ITEM: 'core_components_entity-card-small-{title}-{titleLabel}',
};

const getTitle = title =>
    element(cookTestID(SELECTORS.OPTIONS_MENU_TITLE, { title }), `Options Menu Title: ${title}`);

function getItem(title, titleLabel) {
    return element(
        cookTestID(SELECTORS.OPTIONS_MENU_ITEM, {
            title: title ? title : 'no title',
            titleLabel: titleLabel ? titleLabel : 'no section',
        }),
        `Options Menu Item: ${title}`
    );
}

const OptionMenu = { getTitle, getItem };
export default OptionMenu;
