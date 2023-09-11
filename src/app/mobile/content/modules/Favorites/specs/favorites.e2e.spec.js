import AuthActions from 'src/app/mobile/actions/authActions';
import env from 'src/services/environment';
import { PAGE_NAMES } from 'src/constants/navigation';
import FavoritesListPage from 'src/app/mobile/content/modules/Favorites/pages/FavoritesList/favoritesListPage';
import { expect } from 'chai';
import Main from 'src/app/mobile/content/core/pages/main';
import MorePage, { ITEMS } from 'src/app/mobile/content/modules/More/pages/morePage';
import EntryDetailsReports from 'src/app/mobile/content/modules/EntryDetails/entryDetailsReports';
import { setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import { expectScreenEmptyDisplayed } from 'src/app/mobile/content/components/ScreenEmptyComponent/expectations';
import device from 'src/services/device';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import QuickSearchPage from 'src/app/mobile/content/modules/Search/QuickSearch/quickSearchPage';
import createEntry from 'src/app/mobile/content/features/entryForm/api/services/createEntry';
import removeAllFavorites from 'src/app/mobile/content/modules/Favorites/api/services/removeAllFavorites';
import createDefaultReport from 'src/app/web/modules/Reporting/api/createDefaultReport';
import cookDefaultListConfig from 'src/app/web/modules/ListManagment/api/config/listConfig/cookDefaultListConfig';
import createListByConfig from 'src/app/web/modules/ListManagment/api/services/createListByConfig';
import { uniqueName } from 'src/services/fakeDataGenerator';
import { addStep } from 'src/services/reporting/allure';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import description from 'src/services/reporting/description';
import { openItem } from 'src/app/mobile/actions/morePageActions';
import { SNAPSHOT_DEPTH_MAX_VALUE_100 } from 'config/settings';
import { deleteList } from 'src/app/web/modules/ListManagment/api/services/deleteList';
import { ENTRY_DETAILS_CONTEXT } from 'src/app/mobile/content/modules/EntryDetails/entryDetailsConstants';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

const { NoFavoritesEmptyScreen } = FavoritesListPage;
const listName = uniqueName();
const SEARCH_PREV_CONTEXT = 'Search Results';
const { FAVORITES } = ITEMS;

const entryName = uniqueName();

let restClient;

describe(description.applyEnv('Favorites'), async () => {
    before(async () => {
        restClient = await authorize(ENV_URL, USER);
        const listConfig = await cookDefaultListConfig(restClient, listName);
        await createListByConfig(restClient, listConfig);
        const report = createDefaultReport(restClient, listName);

        const entry = createEntry(restClient, listName, {
            fields: [
                {
                    name: 'Name',
                    value: entryName,
                },
            ],
        });

        await removeAllFavorites(restClient);

        await report;
        await entry;
    });

    it('Message "No Favorites. You do not have any bookmarks" should be displayed', async () => {
        await AuthActions.skipOnboardingScreens();
        await AuthActions.loginToApplication(USER);
        await openItem(FAVORITES);
        await FavoritesListPage.waitForOpened();
        await expectScreenEmptyDisplayed(NoFavoritesEmptyScreen);
    });

    if (!device.isIpad()) {
        it('Entry should be added to Favorites', async () => {
            await FavoritesListPage.NavBar.clickSearchIcon();
            await QuickSearchPage.selectUsingSearch(entryName);
            await EntryDetailsReports.waitForOpened(ENTRY_DETAILS_CONTEXT, SEARCH_PREV_CONTEXT);
            await EntryDetailsReports.EntryDetailsReportHeader.addToFavorites();

            await EntryDetailsReports.NavBar.clickBackIcon({ times: 2 });

            await Main.navigate(PAGE_NAMES.MORE);

            await MorePage.navigate(FAVORITES);
            await FavoritesListPage.waitForOpened();

            await expectEntryInFavorites();
        });
    }

    if (!device.isIpad()) {
        it('Entry should be removed from Favorites', async () => {
            await NavBar.clickSearchIcon();
            await QuickSearchPage.selectUsingSearch(entryName);
            await EntryDetailsReports.EntryDetailsReportHeader.removeFromFavorites();
            await EntryDetailsReports.NavBar.clickBackIcon({ times: 2 });
            await FavoritesListPage.waitForOpened();

            await expectEntryDeletedFromFavorites();
        });
    }

    after(async () => {
        restClient = await authorize(ENV_URL, USER);
        await deleteList(restClient, listName);
    });
});

async function expectEntryInFavorites() {
    await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);
    addStep(`${entryName} should be in 'Favorites'`);
    const isFavoriteItemDisplayed = FavoritesListPage.isFavoriteItemDisplayed(entryName);

    expect(await isFavoriteItemDisplayed, `Entry ${entryName} should be in Favorites`).to.be.true;
}

async function expectEntryDeletedFromFavorites() {
    addStep(`${entryName} should be deleted from 'Favorites'`);
    const isFavoriteItemDisplayed = FavoritesListPage.isFavoriteItemDisplayed(entryName);
    expect(await isFavoriteItemDisplayed, `Entry ${entryName} should not be in Favorites`).to.be
        .false;
}
