import { useRandomFieldValue } from 'src/app/mobile/content/modules/EntryFormEditor/fieldConfigs/ui/useRandomFieldValue';

export default function generateFieldData(changedFields) {
    return changedFields
        .filter(field => field.isDataEditable === true)
        .map(field => useRandomFieldValue(field));
}
