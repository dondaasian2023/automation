import { cookTestID, cookXPath } from 'src/services/cookTestID';
import element from 'src/element';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';
import { logger } from 'src/utils/logger';
import ActionBarButton, { LABEL } from 'src/app/mobile/content/components/actionBarButton';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';

const SELECTORS = {
    MULTI_LINE_TEXT_FIELD: 'components_form_controls_multi-line-text-field-{label}',
    MULTI_LINE_TEXT_FIELD_EDIT: 'components_form_controls_multi-line-text-field-edit-{label}',
};

export default function MultiLineTextField(label) {
    const testId = cookTestID(SELECTORS.MULTI_LINE_TEXT_FIELD_EDIT, { label });
    const multiLine = element(cookTestID(SELECTORS.MULTI_LINE_TEXT_FIELD, { label }));
    const multiLineEdit = element({
        ios: testId,
        android: cookXPath(`//android.view.ViewGroup[@content-desc="${testId}"]/android.widget.EditText`)
    });

    async function setValue(value) {
        if (!value) {
            logger.warn(`${label} - Value not provided`);
            return;
        }
        await swipeToElement(DIRECTIONS.UP, multiLine, { xPoint: 1 });
        await multiLine.clickElement();
        // DEVNOTE: will enter only 2 symbols before cancel input to speed up test
        await multiLineEdit.setValue(value.substring(0, 2));
        await cancel();
        await NativeAlert.pressYes();
        await multiLine.clickElement();
        await multiLineEdit.setValue(value).then(submit);
    }

    async function getValue() {
        await swipeToElement(DIRECTIONS.UP, multiLine, { xPoint: 1 });
        return multiLine.getElementText();
    }

    return {
        setValue,
        getValue,
        getCurrentValue: getValue,
    };
}

async function submit() {
    await ActionBarButton(LABEL.SUBMIT).clickElement();
}

async function cancel() {
    await ActionBarButton(LABEL.CANCEL).clickElement();
}
