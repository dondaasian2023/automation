import { TEXT_FORMAT_TYPES } from 'src/constants/shared';

export const cookWidgetValues = (fieldsIds, fieldsNames, keys) => {
    let x = 1;
    return fieldsIds.map((fieldId, index) => ({
        seqNumber: x++,
        columnFields: [
            {
                fieldId,
            },
        ],
        fieldType: 1,
        formatTypeId: TEXT_FORMAT_TYPES.SingleLine,
        id: keys[index],
        name: fieldsNames[index],
    }));
};
