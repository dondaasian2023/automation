import AuthActions from 'src/app/mobile/actions/authActions';
import Main from 'src/app/mobile/content/core/pages/main';
import { PAGE_NAMES } from 'src/constants/navigation';
import env from 'src/services/environment';
import Onboarding from 'src/app/mobile/content/modules/Onboarding/pages/onboarding';
import CalendarSelectionPage, {
    CALENDARS,
} from 'src/app/mobile/content/modules/Meetings/pages/calendarSelectionPage';
import MeetingsPage from 'src/app/mobile/content/modules/Meetings/pages/meetingsPage';
import { expect } from 'chai';
import device from 'src/services/device';
import { resetApp, setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import { expectScreenEmptyDisplayed } from 'src/app/mobile/content/components/ScreenEmptyComponent/expectations';
import description from 'src/services/reporting/description';
import FirstOnboardingPage from 'src/app/mobile/content/modules/Onboarding/pages/firstOnboardingPage';
import { SNAPSHOT_DEPTH_MAX_VALUE_100, SNAPSHOT_DEPTH_MAX_VALUE_62 } from 'config/settings';

const {
    USERS: [USER],
} = env.default;

const { EmptyCalendarScreen } = MeetingsPage;
const {
    DEFAULT: { CALENDAR },
    OTHER: { BIRTHDAYS },
} = CALENDARS;

const { MEETINGS } = PAGE_NAMES;

describe(description.applyEnv('Meetings'), async () => {
    beforeEach('Login to the application', async () => {
        await resetApp();
        await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);

        await AuthActions.skipOnboardingScreens();
        await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_62);
        await AuthActions.loginToApplication(USER);

        await Main.navigate(MEETINGS);
        if (
            (device.isIpad() && !(await MeetingsPage.isOpened())) ||
            (!device.isIpad() && !(await FirstOnboardingPage.isOpened()))
        ) {
            await Main.navigate(MEETINGS);
        }
    });

    it('Check meetings onboarding screens, No calendars screen is shown after the user selects "Set up Later"', async () => {
        if (!device.isIpad()) {
            await Onboarding.clickNext();
            await Onboarding.clickNext();
            await Onboarding.clickSetupLater();
        }
        await MeetingsPage.waitForOpened();
        await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_62);

        await expectScreenEmptyDisplayed(EmptyCalendarScreen);
    });

    if (device.isIpad()) {
        it.skip;
    } else {
        it('Calendar Selection screen is shown after the user selects "Add Calendars"', async () => {
            await Onboarding.clickNext();
            await Onboarding.clickNext();
            await Onboarding.clickAddCalendars();
            await CalendarSelectionPage.isOpened();
        });
    }

    //Android: The configured google account is required to access the calendar
    if (driver.isAndroid) {
        it.skip;
    } else {
        it('Check adding of 1 calendars', async () => {
            await openMeetingSettings();
            await CalendarSelectionPage.select(CALENDAR);
            await CalendarSelectionPage.BottomActionButton().clickElement();

            expect(
                await MeetingsPage.EmptyCalendarScreen.isTitleDisplayed(),
                'No Calendars Available should not be visible'
            ).to.be.false;
        });
    }

    //Android: The configured google account is required to access the calendar
    if (driver.isAndroid) {
        it.skip;
    } else {
        it('Check adding multiple calendars', async () => {
            await openMeetingSettings();
            await CalendarSelectionPage.select(CALENDAR, BIRTHDAYS);
            await CalendarSelectionPage.BottomActionButton().clickElement();

            expect(
                await MeetingsPage.EmptyCalendarScreen.isTitleDisplayed(),
                'No Calendars Available should not be visible'
            ).to.be.false;
        });
    }
});

const openMeetingSettings = async () => {
    await Onboarding.clickSkip();
    await MeetingsPage.waitForOpened();

    await MeetingsPage.goToMeetingSettings();
    await CalendarSelectionPage.isOpened();
};
