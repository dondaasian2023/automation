import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { addIndex } from 'src/services/fakeDataGenerator';
import { USER_GROUPS } from 'src/app/mobile/content/modules/EntryFormEditor/constants/userGroups';
import { FIELD_TYPES, SYSTEM_FIELD_TYPES } from 'src/constants/shared';

export default function userField({
    name = addIndex(FIELD_NAMES.USER),
    userGroupFilters = [USER_GROUPS.ALL],
} = {}) {
    return {
        name,
        userGroupFilters,
        allowDuplicates: true,
        fieldType: FIELD_TYPES.USER,
        systemFieldType: SYSTEM_FIELD_TYPES.None,
        templateId: FIELD_TYPES.USER,
        isDataEditable: true,
    };
}
