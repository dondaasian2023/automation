import env from 'src/services/environment';
import AuthActions from 'src/app/mobile/actions/authActions';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { expect } from 'chai';
import MorePage, { ITEMS } from 'src/app/mobile/content/modules/More/pages/morePage';
import { PAGE_NAMES } from 'src/constants/navigation';
import { addStep } from 'src/services/reporting/allure';
import description from 'src/services/reporting/description';
import { openMore } from 'src/app/mobile/actions/mainActions';

const EXPECTED_PREV_CONTEXT = PAGE_NAMES.MORE;

const {
    USERS: [USER],
} = env.default;

const PAGES = [
    { page: ITEMS.LISTS, prevContext: EXPECTED_PREV_CONTEXT, context: PAGE_NAMES.OBJECTS },
    { page: ITEMS.VIEWS, prevContext: EXPECTED_PREV_CONTEXT, context: PAGE_NAMES.VIEWS },
    {
        page: ITEMS.TEMPLATE_REPORTS,
        prevContext: EXPECTED_PREV_CONTEXT,
        context: PAGE_NAMES.TEMPLATE_REPORTS,
    },
    { page: ITEMS.FAVORITES, prevContext: EXPECTED_PREV_CONTEXT, context: PAGE_NAMES.FAVORITES },
];

describe(description.applyEnv('"More" page'), async () => {
    before('Open "More" page', async () => {
        await AuthActions.skipOnboardingScreens();
        await AuthActions.loginToApplication(USER);
        await openMore();
    });

    PAGES.forEach(({ page, prevContext, context }) => {
        it(`"${context}" page should be opened`, async () => {
            await MorePage.navigate(page);
            const isOpened = await NavBar.isPageOpened(prevContext, context);
            await NavBar.clickBackIcon();
            await MorePage.waitForOpened();
            addStep.pageShouldBeOpened(context);
            expect(isOpened).to.be.true;
        });
    });
});
