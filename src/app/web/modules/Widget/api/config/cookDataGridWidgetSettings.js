import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { cookWidgetKeys } from 'src/app/mobile/content/modules/Widget/services/cookWidgetKeys';
import { cookWidgetValues } from 'src/app/mobile/content/modules/Widget/services/cookWidgetValues';
import { getPaging } from 'src/app/mobile/content/modules/Widget/services/getPaging';

export function cookDataGridWidgetSettings({ $type, listId, fieldsIds, fieldsNames }) {
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
            wordAddinSettings: {
                separatedRowsForGrouping: true,
                useTableHeaderRowStyleForAllGroupingRows: true,
            },
        },
        title: WIDGET_TYPES.DATA_GRID.LABEL,
    };
}
