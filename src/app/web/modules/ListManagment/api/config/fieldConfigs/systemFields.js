import { getUserFullName } from 'src/services/userService';
import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';

export function getSystemFields({ createdBy, modifiedBy }) {
    return [
        {
            name: FIELD_NAMES.CREATED_BY,
            displayedValue: getUserFullName(createdBy),
        },
        {
            name: FIELD_NAMES.MODIFIED_BY,
            displayedValue: getUserFullName(modifiedBy),
        },
    ];
}
