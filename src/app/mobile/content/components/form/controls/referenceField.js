import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';
import { logger } from 'src/utils/logger';
import SelectFieldModal from 'src/app/mobile/content/components/form/controls/common/select/selectFieldModal';
import { sleep } from 'src/services/driver/driverActions';
import ActionBarButton, { LABEL } from 'src/app/mobile/content/components/actionBarButton';
import OptionMenu from 'src/app/mobile/content/components/OptionsMenu/optionMenu';
import isString from 'src/utils/types/isString';
import { setFieldValues } from 'src/app/mobile/content/components/form/controls/services/entryFormFieldService';
import isNumber from 'src/utils/types/isNumber';

const SELECTORS = {
    FIELD: 'components_form_controls_select-field-modal-{label}',
};

export default function ReferenceField(label) {
    const referenceField = element(cookTestID(SELECTORS.FIELD, { label }));

    async function focusReferenceField() {
        await swipeToElement(DIRECTIONS.UP, referenceField, { xPoint: 1 });
        await referenceField.clickElement();
    }

    async function getValue() {
        await swipeToElement(DIRECTIONS.UP, referenceField, { xPoint: 1 });
        return referenceField.getElementText();
    }

    async function select(item) {
        if (!item) {
            logger.warn(`Reference filed - Missed item to select`);
            return;
        }
        await focusReferenceField();
        await SelectFieldModal.selectItem(item);
    }
    // FIXME: remove sleeps after web team fixes
    async function addNew(reffedList, handleEntryForm) {
        await focusReferenceField();
        await sleep(2000);
        await ActionBarButton(LABEL.ADD_NEW).clickElement();
        await sleep(2000);

        if (reffedList) {
            const listToRefer = OptionMenu.getItem(reffedList);
            await listToRefer.clickElement();
        }

        await handleEntryForm?.();

        await ActionBarButton(LABEL.SAVE).clickElement();
        await sleep(2000);
    }

    async function setValue(value) {
        if (isString(value) || isNumber(value)) {
            await select(value);
            return;
        }
        const {
            entryConfig: { fields },
            referenceListName,
        } = value;

        if (!fields) {
            logger.warn(`No fields provided in entryConfig for "${referenceListName}" list`);
            return;
        }
        await addNew(referenceListName, () => setFieldValues(fields));
    }

    return {
        select,
        getValue,
        getCurrentValue: getValue,
        label,
        setValue,
    };
}
