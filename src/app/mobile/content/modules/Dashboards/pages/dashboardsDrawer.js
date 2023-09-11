import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';
import { allowLocationServices } from 'src/app/mobile/content/components/commonPage';
import { getWindowSize } from 'src/services/driver/driverActions';

const SELECTORS = {
    DASHBOARD: 'core_components_drawer_item-{title}',
};

const getDashboardByTitle = title => element(cookTestID(SELECTORS.DASHBOARD, { title }));

const isDashboardDisplayed = async title => getDashboardByTitle(title).isElementDisplayed();

const openDashboard = async title => {
    await getDashboardByTitle(title).clickElement();
    await allowLocationServices();
    await NavBar.waitForContextOpened(title);
};

const scrollToDashboard = async title => {
    const { width} = await getWindowSize();
    await swipeToElement(DIRECTIONS.UP, getDashboardByTitle(title), { xPoint: width - 10 }, 40);
}

const DashboardsDrawer = {
    isDashboardDisplayed,
    openDashboard,
    scrollToDashboard,
    getDashboardByTitle,
};

export default DashboardsDrawer;
