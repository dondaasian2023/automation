import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { cookWidgetKeys } from 'src/app/mobile/content/modules/Widget/services/cookWidgetKeys';
import { cookWidgetValues } from 'src/app/mobile/content/modules/Widget/services/cookWidgetValues';
import { getWordAddinSettings } from 'src/app/mobile/content/modules/Widget/services/getWordAddinSettings';

export function cookCardWidgetSettings({ $type, listId, fieldsIds, fieldsNames }) {
    const keys = cookWidgetKeys(fieldsIds);
    return {
        $type,
        cardSettings: {
            dataColumns: keys,
        },
        query: {
            iterationEntryListIds: [listId],
            columns: {
                count: keys.length,
                keys,
                values: cookWidgetValues(fieldsIds, fieldsNames, keys),
            },
            wordAddinSettings: getWordAddinSettings(),
        },
        title: WIDGET_TYPES.CARD.LABEL,
    };
}
