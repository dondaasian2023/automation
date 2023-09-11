import description from 'src/services/reporting/description';
import { expect } from 'chai';
import AuthActions from 'src/app/mobile/actions/authActions';
import env from 'src/services/environment';
import DashboardsPage from 'src/app/mobile/content/modules/Dashboards/pages/dashboardsPage';
import DashboardsDrawer from 'src/app/mobile/content/modules/Dashboards/pages/dashboardsDrawer';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import { uniqueName } from 'src/services/fakeDataGenerator';

import cookDashboardConfig from 'src/app/web/modules/Dashboard/api/config/cookDashboardConfig';
import { userGroups } from 'src/app/web/modules/Dashboard/api/constants/userGroups';
import { layout } from 'src/app/web/modules/Dashboard/api/constants/layouts';
import { widgetConfigs } from 'src/app/mobile/content/modules/Widget/constants/widgetConfigs';
import { resolveWidgetIds } from 'src/app/mobile/content/modules/Widget/services/resolveWidgetIds';
import { deleteDashboardByName } from 'src/app/mobile/content/modules/Dashboards/services/deleteDashboardByName';
import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { createReport } from 'src/app/web/modules/Reporting/api/services/createReport';
import NavBar from "src/app/mobile/content/components/NavBar/navBar";

const dashboardName = uniqueName();

const widgetIds = resolveWidgetIds(widgetConfigs);

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

let restClient;

describe(description.applyEnv('Dashboards'), async () => {
    before('Login to the application', async () => {
        restClient = await authorize(ENV_URL, USER);
        const dashboardConfig = cookDashboardConfig({
            widgets: widgetConfigs,
            layout: layout({ widgetIds }),
            userGroups,
            mobileWidgets: widgetIds,
            name: dashboardName,
        });

        await createReport(restClient, dashboardConfig);
        await AuthActions.skipOnboardingScreens();
        await AuthActions.loginToApplication(USER);
    });

    it('Dashboards icon should be displayed', async () => {
        expect(await NavBar.isMenuIconVisible()).to.be.true;
    });

    it('Validate dashboard in drawer', async () => {
        await DashboardsPage.openDashboardsDrawer();
        await DashboardsDrawer.scrollToDashboard(dashboardName);
        expect(
            await DashboardsDrawer.isDashboardDisplayed(dashboardName),
            `${dashboardName} is not displayed`
        ).to.be.true;
        await DashboardsDrawer.openDashboard(dashboardName);
    });

    widgetConfigs.forEach(widget => {
        const widgetType = widget.widgetType;
        const widgetLabel = Object.values(WIDGET_TYPES).find(
            widget => widget.ID === widgetType
        )?.LABEL;
        it(`${widgetLabel} widget should be displayed`, async () => {
            await DashboardsPage.scrollToWidget(widgetLabel);
            await DashboardsPage.isWidgetDisplayed(widgetLabel);
        });
    });

    after('Delete dashboard', async () => {
        restClient = await authorize(ENV_URL, USER);
        await deleteDashboardByName(restClient, dashboardName);
    });
});
