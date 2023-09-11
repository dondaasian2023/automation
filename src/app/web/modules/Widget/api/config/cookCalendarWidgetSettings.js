import { FIELD_TYPES } from 'src/constants/shared';

export function cookCalendarWidgetSettings({ $type, listId, listFields }) {
    const fieldId = getFieldIdByType(listFields, FIELD_TYPES.DATE);
    return {
        $type,
        itemConfigurations: [
            {
                id: 1,
                startFieldId: fieldId,
                endFieldId: fieldId,
                entryListId: listId,
            },
        ],
    };
}

export const getFieldIdByType = (listFields, fieldType) =>
    listFields.find(field => field.fieldType === fieldType).id;
