import FIELD_TYPE from '@dealcloud/core/lib/constants/field/fieldTypes';
import FIELD_FORMAT_TYPE from '@dealcloud/core/lib/constants/field/fieldFormatTypes';
import SYSTEM_FIELD_TYPE from '@dealcloud/core/lib/constants/field/systemFieldTypes';
import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { addIndex } from 'src/services/fakeDataGenerator';

export default function numberField({ name = addIndex(FIELD_NAMES.NUMBER) } = {}) {
    return {
        name,
        allowDuplicates: true,
        fieldType: FIELD_TYPE.NUMBER,
        formatSubTypeId: FIELD_FORMAT_TYPE.NUMBER,
        formatTypeId: FIELD_FORMAT_TYPE.NUMBER,
        systemFieldType: SYSTEM_FIELD_TYPE.None,
        templateId: FIELD_TYPE.NUMBER,
        isDataEditable: true,
    };
}
