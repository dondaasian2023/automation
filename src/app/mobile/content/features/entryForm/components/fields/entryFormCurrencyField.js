import TextField from 'src/app/mobile/content/components/form/controls/textField';
import element from 'src/element';
import SelectFieldModal from 'src/app/mobile/content/components/form/controls/common/select/selectFieldModal';
import { KeyboardSingleDoneButtonAccessory } from 'src/app/mobile/content/components/KeyboardAccessory/KeyboardSingleDoneButtonAccessory';

const currencyLabel = () => element('~feature_components_field_currency');

async function setCurrency(currency) {
    await currencyLabel().clickElement();
    await SelectFieldModal.selectItem(currency);
}

async function getValue() {
    return await currencyLabel().getElementText();
}

export default function EntryFormCurrencyField(label) {
    async function setValue({ value, currency }, { doHideKeyboard = true }) {
        const field = TextField(label, {
            doHideKeyboard,
            AccessoryView: KeyboardSingleDoneButtonAccessory,
        });
        await field.setValue(value);
        await setCurrency(currency);
    }

    return {
        setValue,
        getValue,
        getCurrentValue: getValue,
    };
}
