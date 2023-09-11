import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { getWordAddinSettings } from 'src/app/mobile/content/modules/Widget/services/getWordAddinSettings';
import { TEXT_FORMAT_TYPES } from 'src/constants/shared';

export function cookDataCortexGridWidgetSettings({ $type, keys }) {
    return {
        $type,
        query: {
            iterationEntryListIds: [2139],
            columns: {
                keys: [keys],
                values: [
                    {
                        columnFields: [
                            {
                                fieldId: 4301,
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
        title: WIDGET_TYPES.DATA_CORTEX_GRID.LABEL,
    };
}
