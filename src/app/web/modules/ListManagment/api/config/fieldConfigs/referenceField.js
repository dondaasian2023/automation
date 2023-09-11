import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import { FIELD_TYPES, SYSTEM_FIELD_TYPES } from 'src/constants/shared';

// DEV NOTE: list should only unique field names
let count = 0;
export default function referenceField(...refIds) {
    ++count;
    return {
        name: `${FIELD_NAMES.REFERENCE_FIELD}${count}`,
        fieldType: FIELD_TYPES.REFERENCE,
        isDataEditable: true,
        isReferencesEditable: true,
        templateId: FIELD_TYPES.REFERENCE,
        systemFieldType: SYSTEM_FIELD_TYPES.NONE,
        isRequired: false,
        references: refIds ?? [],
        referenceItems: refIds ?? [],
    };
}
