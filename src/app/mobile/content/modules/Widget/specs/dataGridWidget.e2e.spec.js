import { expect } from 'chai';
import AuthActions from 'src/app/mobile/actions/authActions';
import env from 'src/services/environment';
import { PAGE_NAMES } from 'src/constants/navigation';
import Main from 'src/app/mobile/content/core/pages/main';
import { resetApp, setSnapshotMaxDepth, sleep } from 'src/services/driver/driverActions';
import QuickSearchPage from 'src/app/mobile/content/modules/Search/QuickSearch/quickSearchPage';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import description from 'src/services/reporting/description';
import DashboardsPage from 'src/app/mobile/content/modules/Dashboards/pages/dashboardsPage';
import DashboardsDrawer from 'src/app/mobile/content/modules/Dashboards/pages/dashboardsDrawer';
import GridSearch from 'src/app/mobile/content/modules/Widget/submodules/DataGridWidget/GridSearch';
import FilterEditorPage from 'src/app/mobile/content/modules/Filters/filterEditorPage';
import SelectFieldModal from 'src/app/mobile/content/components/form/controls/common/select/selectFieldModal';
import hideKeyboardByClickingDone from 'src/services/driver/gestures/hideKeyboardByClickingDone';
import GridWidgetPage from 'src/app/mobile/content/modules/Widget/GridWidget/gridWidgetPage';
import SearchInput from 'src/app/mobile/content/components/searchInput';
import {
    DASHBOARD_NAME,
    GRID_SEARCH_MOCKS,
} from 'src/app/mobile/content/modules/Widget/specs/gridSearchMocks';
import { SNAPSHOT_DEPTH_MAX_VALUE_100} from "config/settings";

const {
    USERS: [USER],
} = env.default;

const { FILTER_BY_OPERATOR_VALUE, FILTER_BY_OPERATOR } = GRID_SEARCH_MOCKS;

if (env.isQA) {
    describe(description.applyEnv('Grid Search'), async () => {
        before(async () => {
            await resetApp();
        });

        it('Go to dashboard', async () => {
            await AuthActions.skipOnboardingScreens();
            await AuthActions.loginToApplication(USER);
            await Main.navigate(PAGE_NAMES.DASHBOARDS);
            expect(await NavBar.isMenuIconVisible()).to.be.true;
        });

        it(`Filter by ${FILTER_BY_OPERATOR_VALUE.FILTER.FILTER_BY}`, async () => {
            const { FILTER } = FILTER_BY_OPERATOR_VALUE;

            await NavBar.clickMenuIcon();
            await DashboardsDrawer.openDashboard(DASHBOARD_NAME);

            await NavBar.waitForContextOpened(DASHBOARD_NAME);

            await DashboardsPage.openWidget('Grid');
            await NavBar.waitForContextOpened(DASHBOARD_NAME);
            await sleep(2000);
            await searchFilter(FILTER.FILTER_BY);
            await sleep(4000);
            await hideKeyboardByClickingDone();

            await FilterEditorPage.selectOperator(FILTER.OPERATOR);
            await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);
            await SelectFieldModal.selectItem(FILTER.VALUE);
            await hideKeyboardByClickingDone();
            await FilterEditorPage.saveFilter();
            await GridWidgetPage.clickToggleButton();

            await validateDisplayedCards(FILTER_BY_OPERATOR_VALUE.FOUNDED_ITEMS);
        });

        it(`Filter by ${FILTER_BY_OPERATOR.FILTER.OPERATOR}`, async () => {
            await SearchInput.clear();
            await NavBar.clickCloseIcon();
            await searchFilter(FILTER_BY_OPERATOR.FILTER.FILTER_BY);
            await FilterEditorPage.selectOperator(FILTER_BY_OPERATOR.FILTER.OPERATOR);
            await FilterEditorPage.saveFilter();
            await validateDisplayedCards(FILTER_BY_OPERATOR.FOUNDED_ITEMS);
        });
    });

    const validateDisplayedCards = async entryNames => {
        for (let i = 0; i < entryNames.length; i++) {
            expect(await GridWidgetPage.isCardDisplayed(entryNames[i], i)).to.be.true;
        }
    };

    const searchFilter = async filterBy => {
        await NavBar.clickSearchIcon();
        await QuickSearchPage.setInputValue(filterBy);
        await GridSearch.clickSuggestedSearch(filterBy);
    };
}
