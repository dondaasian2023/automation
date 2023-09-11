import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import description from 'src/services/reporting/description';
import {resetApp, setSnapshotMaxDepth} from 'src/services/driver/driverActions';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import env from 'src/services/environment';
import fieldConfigs from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/fieldConfigs';
import { uniqueName } from 'src/services/fakeDataGenerator';
import { cookDefaultListConfig } from 'src/app/web/modules/ListManagment/api/config/listConfig';
import createListByConfig from 'src/app/web/modules/ListManagment/api/services/createListByConfig';
import DashboardsPage from 'src/app/mobile/content/modules/Dashboards/pages/dashboardsPage';
import createEntry from 'src/app/mobile/content/features/entryForm/api/services/createEntry';
import generateFieldData from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/generateFieldData';
import cookDashboardConfig from 'src/app/web/modules/Dashboard/api/config/cookDashboardConfig';
import { configureLayout } from 'src/app/web/modules/Dashboard/api/constants/layouts';
import { userGroups } from 'src/app/web/modules/Dashboard/api/constants/userGroups';
import { configureWidget } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookWidgetConfig';
import AuthActions from 'src/app/mobile/actions/authActions';
import DashboardsDrawer from 'src/app/mobile/content/modules/Dashboards/pages/dashboardsDrawer';
import { expect } from 'chai';
import { deleteDashboardByName } from 'src/app/mobile/content/modules/Dashboards/services/deleteDashboardByName';
import { deleteList } from 'src/app/web/modules/ListManagment/api/services/deleteList';
import { useListFields } from 'src/app/web/modules/Lists/api/services/useListFields';
import { createReport } from 'src/app/web/modules/Reporting/api/services/createReport';
import NavBar from "src/app/mobile/content/components/NavBar/navBar";
import { SNAPSHOT_DEPTH_MAX_VALUE_100 } from 'config/settings';

const widgets = [
    WIDGET_TYPES.PIVOT_GRID,
    WIDGET_TYPES.DATA_GRID,
    WIDGET_TYPES.CALENDAR,
    WIDGET_TYPES.TEXT_WINDOW,
    WIDGET_TYPES.CARD,
];

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

const { singleLineField, multilineField, dateTimeField } = fieldConfigs;

const listFieldsConfig = {
    fields: [singleLineField(), multilineField(), dateTimeField()],
};

let restClient;

widgets.forEach(widget => {
    const widgetLabel = widget.LABEL;
    const listName = uniqueName(widgetLabel);

    describe(description.applyEnv(`Create dashboard with ${widgetLabel} widget`), async () => {
        before('Login to the application', async () => {
            const resettingApp = resetApp();
            restClient = await authorize(ENV_URL, USER);
            const listId = await createListWithEntry(listName, restClient);
            await createDashboardWithWidget(restClient, widgetLabel, { listName, listId });

            await resettingApp;
            await AuthActions.skipOnboardingScreens();
            await AuthActions.loginToApplication(USER);
            await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);
        });

        it('Dashboards icon should be displayed', async () => {
            expect(await NavBar.isMenuIconVisible()).to.be.true;
        });

        it('Validate dashboard in drawer', async () => {
            await DashboardsPage.openDashboardsDrawer();
            await DashboardsDrawer.scrollToDashboard(listName);
            expect(
                await DashboardsDrawer.isDashboardDisplayed(listName),
                `${listName} is not displayed`
            ).to.be.true;
            await DashboardsDrawer.openDashboard(listName);
        });

        it(`${widgetLabel} widget should be displayed`, async () => {
            await DashboardsPage.scrollToWidget(widgetLabel);
            await DashboardsPage.isWidgetDisplayed(widgetLabel);
        });

        after('Delete dashboard', async () => {
            restClient = await authorize(ENV_URL, USER);
            await deleteDashboardByName(restClient, listName);
            await deleteList(restClient, listName);
        });
    });
});

async function createListWithEntry(listName, restClient) {
    const listConfig = await cookDefaultListConfig(restClient, listName, {
        changedFields: listFieldsConfig.fields,
    });
    await createListByConfig(restClient, listConfig);
    const fieldData = generateFieldData(listConfig.changedFields);
    const { listId } = await createEntry(restClient, listName, {
        fields: fieldData,
    });
    return listId;
}

async function createDashboardWithWidget(restClient, widgetLabel, { listName, listId }) {
    const { listFields, fieldsIds, fieldsNames } = await useListFields(restClient, listId);
    const widgetConfig = configureWidget(widgetLabel, listId, fieldsIds, listFields, fieldsNames);

    const dashboardConfig = cookDashboardConfig({
        widgets: [widgetConfig],
        layout: configureLayout(widgetConfig.refId),
        userGroups,
        mobileWidgets: [widgetConfig.refId],
        name: listName,
    });
    await createReport(restClient, dashboardConfig);
}
