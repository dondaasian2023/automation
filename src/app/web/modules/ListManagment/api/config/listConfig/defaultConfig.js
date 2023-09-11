import FIELD_TYPE from '@dealcloud/core/lib/constants/field/fieldTypes';
import FIELD_FORMAT_TYPE from '@dealcloud/core/lib/constants/field/fieldFormatTypes';
import SYSTEM_FIELD_TYPE from '@dealcloud/core/lib/constants/field/systemFieldTypes';
import TEXT_FORMAT_TYPE from '@dealcloud/core/lib/constants/field/textFormatTypes';
import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';

export const DEFAULT_FIELDS = [
    {
        allowDuplicates: false,
        fieldType: FIELD_TYPE.TEXT,
        formatSubTypeId: FIELD_FORMAT_TYPE.TEXT,
        formatTypeId: TEXT_FORMAT_TYPE.SingleLine,
        isName: true,
        isRequired: true,
        isUsedInLookupsEditable: false,
        isUsedInLookups: true,
        name: FIELD_NAMES.NAME,
        systemFieldType: SYSTEM_FIELD_TYPE.Name,
        templateId: FIELD_TYPE.TEXT,
        isDataEditable: true,
    },
    {
        fieldType: FIELD_TYPE.USER,
        isDataEditable: false,
        name: FIELD_NAMES.CREATED_BY,
        systemFieldType: SYSTEM_FIELD_TYPE.CreatedBy,
        templateId: FIELD_TYPE.USER,
        isUsedInLookupsEditable: true,
        isUsedInLookups: false,
    },
    {
        fieldType: FIELD_TYPE.USER,
        isDataEditable: false,
        name: FIELD_NAMES.MODIFIED_BY,
        systemFieldType: SYSTEM_FIELD_TYPE.ModifiedBy,
        templateId: FIELD_TYPE.USER,
        isUsedInLookupsEditable: true,
        isUsedInLookups: false,
    },
    {
        fieldType: FIELD_TYPE.DATE,
        formatSubTypeId: FIELD_FORMAT_TYPE.DATETIME,
        formatTypeId: 14,
        isDataEditable: false,
        name: FIELD_NAMES.MODIFIED_DATE,
        systemFieldType: SYSTEM_FIELD_TYPE.Modified,
        templateId: FIELD_TYPE.DATE,
        isUsedInLookupsEditable: true,
        isUsedInLookups: false,
    },
    {
        fieldType: FIELD_TYPE.DATE,
        formatSubTypeId: FIELD_FORMAT_TYPE.DATETIME,
        formatTypeId: 14,
        isDataEditable: false,
        name: FIELD_NAMES.CREATED_DATE,
        systemFieldType: SYSTEM_FIELD_TYPE.Created,
        templateId: FIELD_TYPE.DATE,
        isUsedInLookupsEditable: true,
        isUsedInLookups: false,
    },
];
