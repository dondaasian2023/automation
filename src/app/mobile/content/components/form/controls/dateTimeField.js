import DatePicker from 'src/app/mobile/content/components/DatePicker';
import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';

const SELECTOR = 'components_form_controls_date-time-field-{label}';

export default function DateTimeField(label) {
    const field = element(cookTestID(SELECTOR, { label }));

    async function setValue(value) {
        // TODO: implement date selection. Now only current date can be selected
        await swipeToElement(DIRECTIONS.UP, field, { xPoint: 1 });
        await field.clickElement();
        await DatePicker.selectCurrentDate();
    }

    async function getValue() {
        await swipeToElement(DIRECTIONS.UP, field, { xPoint: 1 });
        return field.getElementText();
    }

    return {
        getValue,
        getCurrentValue: getValue,
        setValue,
        label,
    };
}
