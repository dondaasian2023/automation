import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { getDateTimeCodeByFormat } from 'src/utils/formatters/resolveDate';
import { PATTERNS } from 'src/app/mobile/content/modules/EntryFormEditor/constants/dateTimeFormats';
import { FIELD_TYPES, SYSTEM_FIELD_TYPES } from 'src/constants/shared';

export default function dateTimeField({
    formatTypeId = getDateTimeCodeByFormat(PATTERNS.MM_DD_YY),
} = {}) {
    return {
        formatTypeId,
        fieldType: FIELD_TYPES.DATE,
        name: FIELD_NAMES.DATE_TIME,
        systemFieldType: SYSTEM_FIELD_TYPES.None,
        templateId: FIELD_TYPES.DATE,
        isDataEditable: true,
    };
}
