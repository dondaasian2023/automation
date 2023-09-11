import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { addIndex } from 'src/services/fakeDataGenerator';
import CURRENCY_CODES from 'src/app/mobile/content/modules/EntryFormEditor/constants/currencyCodes';
import { FIELD_TYPES, SYSTEM_FIELD_TYPES } from 'src/constants/shared';

export default function currencyField({
    name = addIndex(FIELD_NAMES.CURRENCY),
    defaultCurrencyCode = CURRENCY_CODES.USD,
} = {}) {
    return {
        name,
        defaultCurrencyCode,
        fieldType: FIELD_TYPES.CURRENCY,
        systemFieldType: SYSTEM_FIELD_TYPES.None,
        templateId: FIELD_TYPES.BOOLEAN,
        sourceTypeId: 1,
        isDataEditable: true,
    };
}
