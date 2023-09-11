import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { addIndex } from 'src/services/fakeDataGenerator';
import { BOOLEAN_VALUES } from 'src/app/mobile/content/modules/EntryFormEditor/constants/booleanValues';
import { FIELD_TYPES, SYSTEM_FIELD_TYPES } from 'src/constants/shared';

export default function booleanField({
    name = addIndex(FIELD_NAMES.BOOLEAN),
    defaultValue = BOOLEAN_VALUES.NO,
} = {}) {
    return {
        name,
        defaultValue,
        fieldType: FIELD_TYPES.BOOLEAN,
        systemFieldType: SYSTEM_FIELD_TYPES.None,
        templateId: FIELD_TYPES.BOOLEAN,
        isDataEditable: true,
    };
}
