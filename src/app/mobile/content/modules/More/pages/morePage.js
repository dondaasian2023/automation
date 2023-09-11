import commonPage from 'src/app/mobile/content/components/commonPage';
import element from 'src/element';
import { PAGE_NAMES } from 'src/constants/navigation';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { addStep } from 'src/services/reporting/allure';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';

const SELECTORS = {
    LIST_ITEMS: {
        LISTS: '~more_more-menu_lists',
        VIEWS: '~more_more-menu_views',
        TEMPLATE_REPORTS: '~more_more-menu_template-reports',
        FAVORITES: '~more_more-menu_favorites',
        DEVELOPER_SETTINGS: '~more_more-menu_developer-settings',
        DRAFTS_AND_OFFLINE_ENTRIES: '~more_more-menu_drafts-and-offline-entries',
        SETTINGS: '~more_more-menu_settings'
    },
};

async function navigate(selector) {
    addStep(`More page - tap: ${selector}`);

    await swipeToElement(DIRECTIONS.UP, element(selector));
    await element(selector).tapElement();
}
const ITEMS = SELECTORS.LIST_ITEMS;
const MorePage = { ...commonPage(ITEMS.SETTINGS, PAGE_NAMES.MORE), NavBar, navigate };
export { ITEMS };
export default MorePage;
