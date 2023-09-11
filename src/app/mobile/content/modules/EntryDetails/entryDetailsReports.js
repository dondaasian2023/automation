import EntryDetailsReportHeader from 'src/app/mobile/content/modules/EntryDetails/entryDetailsReportHeader';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import ScreenEmptyComponent from 'src/app/mobile/content/components/ScreenEmptyComponent/screenEmptyComponent';
import {
    DETAILS_REPORTS_EMPTY_SCREEN_LABEL,
    DETAILS_REPORTS_EMPTY_SCREEN_TITLE,
} from 'src/app/mobile/content/modules/EntryDetails/entryDetailsConstants';
import ActionBarButton, { LABEL } from 'src/app/mobile/content/components/actionBarButton';

async function waitForOpened(entryName, prevContext) {
    if (!prevContext) {
        await NavBar.waitForContextOpened(entryName);
        return;
    }
    await NavBar.waitForPageOpened(prevContext, entryName);
}

const EntryDetailsReports = {
    EntryDetailsReportHeader,
    NavBar,
    waitForOpened,
    NoReportsScreen: ScreenEmptyComponent(
        DETAILS_REPORTS_EMPTY_SCREEN_TITLE,
        DETAILS_REPORTS_EMPTY_SCREEN_LABEL
    ),
    close: () => ActionBarButton(LABEL.CLOSE).clickElement(),
};
export default EntryDetailsReports;
