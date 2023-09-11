import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { addIndex } from 'src/services/fakeDataGenerator';
import { FIELD_TYPES, SYSTEM_FIELD_TYPES } from 'src/constants/shared';

function cookChoiceFieldOptions(choiceOptions) {
    return choiceOptions.map((item, index) => ({
        id: -(index + 1),
        name: item,
        order: index + 1,
    }));
}

export default function choiceField({
    name = addIndex(FIELD_NAMES.CHOICE),
    choiceFieldOptions,
} = {}) {
    return {
        name,
        choiceFieldId: -1,
        choiceFieldOptions: cookChoiceFieldOptions(choiceFieldOptions),
        choiceFieldOrder: 1,
        fieldType: FIELD_TYPES.CHOICE,
        systemFieldType: SYSTEM_FIELD_TYPES.None,
        templateId: FIELD_TYPES.CHOICE,
        isDataEditable: true,
    };
}
