import element from 'src/element';
import { PAGE_NAMES } from 'src/constants/navigation';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import DataTable from 'src/app/mobile/content/modules/Widget/GridWidget/compoments/DataTable/dataTable';
import DataRow from 'src/app/mobile/content/modules/Widget/GridWidget/compoments/RowList/dataRow';
import { addStep } from 'src/services/reporting/allure';
import theme from 'src/services/theme';
import { setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import { SNAPSHOT_DEPTH_MAX_VALUE_100 } from 'config/settings';

const SELECTORS = {
    TOGGLE_BUTTON: '~widget_grid_widget_grid-toggle-button',
};

async function clickToggleButton() {
    await element(SELECTORS.TOGGLE_BUTTON).clickElement();
}

async function waitForOpened(listName) {
    const { LISTS, OBJECTS } = PAGE_NAMES;
    const prevContext = theme.isDC ? LISTS : OBJECTS;
    await NavBar.waitForPageOpened(prevContext, listName);
}

async function openCard(cardTitle, cardIndex = 0) {
    addStep(`Open card: ${cardTitle} ${cardIndex}`);
    await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);
    await DataRow(cardTitle, cardIndex).clickElement();
}

async function isCardDisplayed(cardTitle, cardIndex = 0) {
    addStep(`Finding card: ${cardTitle} ${cardIndex}`);
    return await DataRow(cardTitle, cardIndex).isElementDisplayed();
}

const GridWidgetPage = { waitForOpened, clickToggleButton, DataTable, openCard, isCardDisplayed };
export default GridWidgetPage;
