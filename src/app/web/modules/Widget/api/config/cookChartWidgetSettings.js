import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { CHART_TYPES } from 'src/app/web/modules/Dashboard/api/constants/chartTypes';
import { getWordAddinSettings } from 'src/app/mobile/content/modules/Widget/services/getWordAddinSettings';
import { TEXT_FORMAT_TYPES } from 'src/constants/shared';

export function cookChartWidgetSettings({ $type, keys, chartType = CHART_TYPES.LINE }) {
    return {
        $type,
        displayType: 1,
        query: {
            iterationEntryListIds: [2139],
            columns: {
                keys: [keys],
                values: [
                    {
                        seqNumber: 1,
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
        chartType,
        title: WIDGET_TYPES.CHART.LABEL,
    };
}
