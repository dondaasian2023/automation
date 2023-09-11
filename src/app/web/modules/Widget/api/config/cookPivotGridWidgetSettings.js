import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { cookWidgetValues } from 'src/app/mobile/content/modules/Widget/services/cookWidgetValues';
import { cookWidgetKeys } from 'src/app/mobile/content/modules/Widget/services/cookWidgetKeys';
import { getPaging } from 'src/app/mobile/content/modules/Widget/services/getPaging';
import { getWordAddinSettings } from 'src/app/mobile/content/modules/Widget/services/getWordAddinSettings';

export function cookPivotGridWidgetSettings({ $type, listId, fieldsIds, fieldsNames }) {
    const keys = cookWidgetKeys(fieldsIds);
    return {
        $type,
        query: {
            iterationEntryListIds: [listId],
            paging: getPaging(),
            columns: {
                keys,
                values: cookWidgetValues(fieldsIds, fieldsNames, keys),
            },
            wordAddinSettings: getWordAddinSettings(),
        },
        title: WIDGET_TYPES.PIVOT_GRID.LABEL,
    };
}
