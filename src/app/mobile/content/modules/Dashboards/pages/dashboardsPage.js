import element from 'src/element';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { PAGE_NAMES } from 'src/constants/navigation';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';
import { addStep } from 'src/services/reporting/allure';
import { expect } from 'chai';
import { allowLocationServices } from 'src/app/mobile/content/components/commonPage';

async function isOpened() {
    await NavBar.waitForPrevContextOpened(PAGE_NAMES.DASHBOARDS);
}

async function openDashboardsDrawer() {
    await NavBar.clickMenuIcon();
    await allowLocationServices();
}

async function scrollToWidget(widgetType) {
    await swipeToElement(DIRECTIONS.UP, element(cookWidgetSelector(widgetType)), {
        xPoint: 1,
    });
}

async function openWidget(widgetType) {
    await scrollToWidget(widgetType);
    await element(cookWidgetSelector(widgetType)).clickElement();
}

function cookWidgetSelector(widgetType) {
    return `~${widgetType}`;
}

async function isWidgetDisplayed(widgetType) {
    addStep(`Widget ${widgetType} should be displayed`);
    expect(
        await element(
            DashboardsPage.cookWidgetSelector(widgetType),
            widgetType
        ).isElementDisplayed(),
        `${widgetType} is not displayed`
    ).to.be.true;
}

const DashboardsPage = {
    isOpened,
    scrollToWidget,
    openDashboardsDrawer,
    cookWidgetSelector,
    isWidgetDisplayed,
    openWidget,
};

export default DashboardsPage;
