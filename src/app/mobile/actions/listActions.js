import ListsList from 'src/app/mobile/content/modules/Lists/listsList';
import GridWidgetPage from 'src/app/mobile/content/modules/Widget/GridWidget/gridWidgetPage';
import { ITEMS } from 'src/app/mobile/content/modules/More/pages/morePage';
import { openItem } from 'src/app/mobile/actions/morePageActions';
import { addStep } from 'src/services/reporting/allure';
import NavBar from '../content/components/NavBar/navBar';

export const openList = async listName => {
    addStep(`Open list ${listName}`);
    await openItem(ITEMS.LISTS);
    await ListsList.waitForOpened();

    // DEVNOTE: Fix for Android to get title displayed, manually not reproduced, needs investigation
    if (driver.isAndroid) {
        await ListsList.openList(listName);
        await NavBar.filter();
        await NavBar.clickBackIcon();
    } else {
        await ListsList.openList(listName);
    }
    await GridWidgetPage.waitForOpened(listName);
};
