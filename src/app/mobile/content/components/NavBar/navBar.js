import element from 'src/element';
import clickCalendarSelectionSettings from 'src/app/mobile/content/components/NavBar/calendarSelection';
import NavBarTitle from 'src/app/mobile/content/components/NavBar/title';
import { addStep } from 'src/services/reporting/allure';

const SELECTORS = {
    BACK: '~navigation-header-button_navigation-header-back',
    SEARCH: '~navigation-header-button_navigation-header-search',
    FILTER_BUTTON: '~navigation-header-button_navigation-header-filter',
    SETTINGS: '~navigation-header-button_navigation-header-settings',
    MENU: '~navigation-header-button_dashboards',
    CLOSE: '~navigation-header-button_navigation-header-close'
};

const cookName = name => `NavBar: ${name}`;
const cookIcon = (selector, label) => element(selector, cookName(label));
const clickByIcon = (selector, label) => cookIcon(selector, label).clickElement();

async function clickBackIcon({ times = 1 } = {}) {
    addStep(`Click Back ${times} times`);
    await element(SELECTORS.BACK).clickElement(times);
}

async function clickSearchIcon() {
    await clickByIcon(SELECTORS.SEARCH, 'Search');
}

async function filter() {
    await clickByIcon(SELECTORS.FILTER_BUTTON, 'Filter');
}

async function settings() {
    await cookIcon(SELECTORS.SETTINGS, 'Settings').tapUntilPresent();
}

async function clickMenuIcon() {
    await clickByIcon(SELECTORS.MENU, 'Menu');
}

function isMenuIconVisible() {
    return element(SELECTORS.MENU).isElementDisplayed();
}
async function clickCloseIcon() {
    await clickByIcon(SELECTORS.CLOSE, 'Close');
}

const NavBar = {
    clickBackIcon,
    clickSearchIcon,
    clickCloseIcon,
    filter,
    settings,
    isPageOpened: NavBarTitle.isPageOpened,
    isPrevContextOpened: NavBarTitle.isPrevContextOpened,
    isContextOpened: NavBarTitle.isContextOpened,
    waitForPageOpened: NavBarTitle.waitForPageOpened,
    waitForContextOpened: NavBarTitle.waitForContextOpened,
    waitForPrevContextOpened: NavBarTitle.waitForPrevContextOpened,
    clickCalendarSelectionSettings,
    clickMenuIcon,
    isMenuIconVisible
};
export default NavBar;
