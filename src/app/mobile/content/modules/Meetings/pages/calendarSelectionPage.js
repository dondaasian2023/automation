import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import { PAGE_NAMES } from 'src/constants/navigation';
import Switch from 'src/app/mobile/content/components/switch';
import BottomActionButton from 'src/app/mobile/content/components/bottomActionButton';
import { addStep } from 'src/services/reporting/allure';

export const CALENDARS = {
    DEFAULT: {
        CALENDAR: 'Calendar',
    },
    OTHER: {
        BIRTHDAYS: 'Birthdays',
        SIRI_SUGGESTIONS: 'Siri Suggestions',
    },
};

async function isOpened() {
    await NavBar.waitForPageOpened(PAGE_NAMES.MEETINGS, 'Select Calendars');
}

async function select(...calendars) {
    addStep(`Select calendar(s) "${calendars}"`);
    for (let calendar of calendars) {
        await Switch(calendar).clickElement();
    }
}

const CalendarSelectionPage = { isOpened, select, BottomActionButton };
export default CalendarSelectionPage;
