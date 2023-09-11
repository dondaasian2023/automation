import { useFieldComponent } from 'src/app/mobile/content/modules/EntryFormEditor/fieldConfigs/ui/useFieldComponent';

export function getControl({ fieldType, formatTypeId, formatSubTypeId }) {
    const Control = useFieldComponent({ fieldType, formatTypeId, formatSubTypeId });
    if (!Control) {
        throw Error(`Could not find control, fieldType: "${fieldType}"`);
    }
    return Control;
}

export async function setFieldValue(
    { name, value, fieldType, formatTypeId, formatSubTypeId },
    doHideKeyboard
) {
    const Control = getControl({ fieldType, formatTypeId, formatSubTypeId });
    await Control(name.toString())?.setValue(value, { doHideKeyboard });
}

export async function setFieldValues(fields) {
    for (const field of fields) {
        await setFieldValue(field, { doHideKeyboard: true });
    }
}

export async function getFieldValue({ fieldType, formatTypeId, formatSubTypeId, name }) {
    const Control = getControl({ fieldType, formatTypeId, formatSubTypeId });
    return {
        name,
        value: (await Control(name)?.getCurrentValue()) ?? '',
    };
}
