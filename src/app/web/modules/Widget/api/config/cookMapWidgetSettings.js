import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { getWordAddinSettings } from 'src/app/mobile/content/modules/Widget/services/getWordAddinSettings';
import { TEXT_FORMAT_TYPES } from 'src/constants/shared';

export function cookMapWidgetSettings({ $type, keys }) {
    return {
        $type,
        displayType: 1,
        fields: [
            {
                id: 6,
                name: 'Country',
                placeholder: 'Country',
                value: 189,
            },
        ],
        listsSettings: [
            {
                id: 4375,
                displayName: '123',
                color: '#4182e6',
            },
        ],
        pinConfiguration: {
            4375: {
                titleFieldId: 4376,
                fieldsIds: {
                    0: 4381,
                },
            },
        },
        addressType: 1,
        query: {
            iterationEntryListIds: [4375],
            columns: {
                keys: [keys],
                values: [
                    {
                        seqNumber: 1,
                        columnFields: [
                            {
                                fieldId: 4376,
                            },
                        ],
                        fieldType: 1,
                        formatTypeId: TEXT_FORMAT_TYPES.SingleLine,
                        id: keys,
                        name: 'Name',
                    },
                ],
            },
            wordAddinSettings: getWordAddinSettings(),
        },
        lists: [
            {
                id: 4375,
                name: '123',
            },
        ],
        title: WIDGET_TYPES.MAP.LABEL,
    };
}
