import AuthActions from 'src/app/mobile/actions/authActions';
import MorePage from 'src/app/mobile/content/modules/More/pages/morePage';
import { expect } from 'chai';
import env from 'src/services/environment';
import QuickSearchPage from 'src/app/mobile/content/modules/Search/QuickSearch/quickSearchPage';
import EntryDetailsReports from 'src/app/mobile/content/modules/EntryDetails/entryDetailsReports';
import FavoritesListPage from 'src/app/mobile/content/modules/Favorites/pages/FavoritesList/favoritesListPage';
import { expectScreenEmptyDisplayed } from 'src/app/mobile/content/components/ScreenEmptyComponent/expectations';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import createEntry from 'src/app/mobile/content/features/entryForm/api/services/createEntry';
import createDefaultReport from 'src/app/web/modules/Reporting/api/createDefaultReport';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import cookDefaultListConfig from 'src/app/web/modules/ListManagment/api/config/listConfig/cookDefaultListConfig';
import createListByConfig from 'src/app/web/modules/ListManagment/api/services/createListByConfig';
import { uniqueName } from 'src/services/fakeDataGenerator';
import removeAllFavorites from 'src/app/mobile/content/modules/Favorites/api/services/removeAllFavorites';
import description from 'src/services/reporting/description';
import { deleteList } from 'src/app/web/modules/ListManagment/api/services/deleteList';
import { ENTRY_DETAILS_CONTEXT } from 'src/app/mobile/content/modules/EntryDetails/entryDetailsConstants';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

const LIST_NAME = uniqueName();
const ENTRY_DETAILS_REPORT_PREV_CONTEXT = 'Search Results';
const { FavoritesEmptyScreen } = QuickSearchPage;

const ENTRY_NAME = uniqueName('Search test');

let restClient;

describe(description.applyEnv('Search'), async () => {
    before(async () => {
        restClient = await authorize(ENV_URL, USER);
        const listConfig = await cookDefaultListConfig(restClient, LIST_NAME);
        await createListByConfig(restClient, listConfig);
        const report = createDefaultReport(restClient, LIST_NAME);
        const removingFavorites = await removeAllFavorites(restClient);

        const entry = createEntry(restClient, LIST_NAME, {
            fields: [
                {
                    name: 'Name',
                    value: ENTRY_NAME,
                },
            ],
        });

        await report;
        await entry;
        await removingFavorites;

        await AuthActions.skipOnboardingScreens();
        await AuthActions.loginToApplication(USER);
    });

    it('"You have no recent searches" should be displayed', async () => {
        await NavBar.clickSearchIcon();
        await QuickSearchPage.clickRecentTab();

        expect(
            await QuickSearchPage.youHaveNoRecentSearchesIsDisplayed(),
            '"You have no recent searches" should be displayed',
        ).to.be.true;
    });

    it(
        '"No Favorites. Easily access a contact, company, etc., here. Go to an entry and add it as a' +
        ' favorite." should be displayed',
        async () => {
            await QuickSearchPage.clickFavoritesTab();
            await expectScreenEmptyDisplayed(FavoritesEmptyScreen);
        },
    );

    it('Item should be Displayed in "Recent Searched"', async () => {
        await QuickSearchPage.clickRecentTab();
        await QuickSearchPage.setInputValue(ENTRY_NAME);
        await QuickSearchPage.waitForItemToBeDisplayedInSearchResults(ENTRY_NAME, LIST_NAME);

        await QuickSearchPage.NavBar.clickBackIcon();
        await MorePage.clickSearchIcon();

        expect(
            await QuickSearchPage.isItemTitleInRecentSearches(ENTRY_NAME),
            `${ENTRY_NAME} should be displayed in "Recent Searched"`,
        ).to.be.true;
    });

    it('Item should be displayed in "Recently Visited"', async () => {
        await QuickSearchPage.selectUsingSearch(ENTRY_NAME);
        await EntryDetailsReports.waitForOpened(ENTRY_DETAILS_CONTEXT, ENTRY_DETAILS_REPORT_PREV_CONTEXT);
        await NavBar.clickBackIcon({ times: 2 });
        await NavBar.clickSearchIcon();

        expect(
            await QuickSearchPage.isItemTitleInRecentSearches(ENTRY_NAME),
            `${ENTRY_NAME} should be displayed in "Recently Visited"`,
        ).to.be.true;
    });

    it('Item should be displayed in "Favorites" tab', async () => {
        await QuickSearchPage.selectUsingSearch(ENTRY_NAME);
        await EntryDetailsReports.waitForOpened(ENTRY_DETAILS_CONTEXT, ENTRY_DETAILS_REPORT_PREV_CONTEXT);
        await EntryDetailsReports.EntryDetailsReportHeader.addToFavorites();

        await NavBar.clickBackIcon({ times: 2 });

        await NavBar.clickSearchIcon();
        await QuickSearchPage.clickFavoritesTab();
        await QuickSearchPage.clickFavoritesTab();

        const isFavoriteItemDisplayed = FavoritesListPage.isFavoriteItemDisplayed(ENTRY_NAME);

        expect(await isFavoriteItemDisplayed, `"${ENTRY_NAME}" should be displayed`).to.be.true;
    });

    after(async () => {
        restClient = await authorize(ENV_URL, USER);
        await deleteList(restClient, LIST_NAME);
    });
});
