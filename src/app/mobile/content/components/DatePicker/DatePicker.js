import element from 'src/element';

const DRAWER_ACTION_BUTTON_LABELS = {
    OK: 'ok',
    CLEAR: 'clear',
};
const DrawerActionButton = label =>
    element(`~core_components_date_time_picker_drawer-content-action-button-${label}`);

const selectCurrentDate = async () =>
    await (await DrawerActionButton(DRAWER_ACTION_BUTTON_LABELS.OK)).clickElement();

const DatePicker = { selectCurrentDate };
export default DatePicker;
