import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { addIndex } from 'src/services/fakeDataGenerator';
import {
    FIELD_FORMAT_TYPES,
    FIELD_TYPES,
    SYSTEM_FIELD_TYPES,
    TEXT_FORMAT_TYPES,
} from 'src/constants/shared';

export default function multilineField({ name = addIndex(FIELD_NAMES.MULTI_LINE) } = {}) {
    return {
        name,
        fieldType: FIELD_TYPES.TEXT,
        formatSubTypeId: FIELD_FORMAT_TYPES.TEXT,
        formatTypeId: TEXT_FORMAT_TYPES.MultiLine,
        systemFieldType: SYSTEM_FIELD_TYPES.None,
        templateId: FIELD_TYPES.TEXT,
        isDataEditable: true,
    };
}
