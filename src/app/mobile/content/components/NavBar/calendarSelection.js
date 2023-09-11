import element from 'src/element';

const SELECTORS = {
    CALENDAR_SELECTION: '~components_navbar_calendar_selection-settings',
};

export default async function clickCalendarSelectionSettings() {
    await element(SELECTORS.CALENDAR_SELECTION).clickElement();
}
