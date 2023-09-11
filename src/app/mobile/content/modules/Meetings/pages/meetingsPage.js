import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { PAGE_NAMES } from 'src/constants/navigation';
import ScreenEmptyComponent from 'src/app/mobile/content/components/ScreenEmptyComponent/screenEmptyComponent';
import {
    EMPTY_SCREEN_LABEL,
    EMPTY_SCREEN_TITLE,
} from 'src/app/mobile/content/modules/Meetings/meetingsConstants';
import ActionButton from 'src/app/mobile/content/components/actionButton';
import { addStep } from 'src/services/reporting/allure';
import { SNAPSHOT_DEPTH_MAX_VALUE_62 } from 'config/settings';

async function goToMeetingSettings() {
    const title = 'Go to Meetings Settings';
    addStep(`Click "${title}"`);
    await ActionButton(title).clickElement();
}

async function waitForOpened() {
    await NavBar.waitForContextOpened(PAGE_NAMES.MEETINGS);
}

async function isOpened() {
    await NavBar.isContextOpened(PAGE_NAMES.MEETINGS);
}

const MeetingsPage = {
    NavBar,
    goToMeetingSettings,
    waitForOpened,
    isOpened,
    EmptyCalendarScreen: ScreenEmptyComponent(
        EMPTY_SCREEN_TITLE,
        EMPTY_SCREEN_LABEL,
        SNAPSHOT_DEPTH_MAX_VALUE_62
    ),
};
export default MeetingsPage;
