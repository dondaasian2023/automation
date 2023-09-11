import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { addIndex } from 'src/services/fakeDataGenerator';
import { FIELD_FORMAT_TYPES, FIELD_TYPES, SYSTEM_FIELD_TYPES } from 'src/constants/shared';

export default function numberCurrencyField({ name = addIndex(FIELD_NAMES.CURRENCY) } = {}) {
    return {
        name,
        allowDuplicates: true,
        fieldType: FIELD_TYPES.NUMBER,
        formatSubTypeId: FIELD_FORMAT_TYPES.CURRENCY,
        // FIXME: Use value from dev rep when it would be available
        formatTypeId: 10,
        systemFieldType: SYSTEM_FIELD_TYPES.None,
        templateId: FIELD_TYPES.NUMBER,
        isMoney: true,
        isDataEditable: true,
    };
}
