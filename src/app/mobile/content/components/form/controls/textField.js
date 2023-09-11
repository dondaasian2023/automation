import element from 'src/element';
import { cookTestID, cookXPath } from 'src/services/cookTestID';
import hideKeyboardByClickingDone from 'src/services/driver/gestures/hideKeyboardByClickingDone';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';
import { logger } from 'src/utils/logger';
import { KeyboardSingleDoneButtonAccessory } from 'src/app/mobile/content/components/KeyboardAccessory/KeyboardSingleDoneButtonAccessory';

const SELECTOR = 'components_form_controls_text-field-{label}';

export default function TextField(label, { AccessoryView } = {}) {
    const testId = cookTestID(SELECTOR, { label });
    const textField = element({
        ios: testId,
        android: cookXPath(`//android.view.ViewGroup[@content-desc="${testId}"]/android.widget.EditText`)
    });

    async function hideKeyboard(doHideKeyboard = true) {
        if (!doHideKeyboard) return;
        if (AccessoryView) {
            await AccessoryView().tapUntilPresent();
        } else {
            await hideKeyboardByClickingDone();
        }
    }

    async function setValue(value, { doHideKeyboard } = {}) {
        if (!value) {
            logger.warn(`${label} - value not provided`);
            return;
        }
        await swipeToElement(DIRECTIONS.UP, textField, { xPoint: 1 });
        await textField.clickElement();
        await textField.setValue(value);
        await hideKeyboard(doHideKeyboard);
    }

    async function getValue() {
        await swipeToElement(DIRECTIONS.UP, textField, { xPoint: 1 });
        return textField.getElementText();
    }

    return {
        setValue,
        getValue,
        getCurrentValue: getValue,
        hideKeyboard,
        label,
    };
}

export function EmailField(label) {
    return TextField(label);
}

export function UrlField(label) {
    return TextField(label);
}

export function PhoneField(label) {
    return TextField(label, {
        AccessoryView: KeyboardSingleDoneButtonAccessory,
    });
}

export function NumberField(label) {
    return TextField(label, {
        AccessoryView: KeyboardSingleDoneButtonAccessory,
    });
}
