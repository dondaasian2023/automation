import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { cookDataGridWidgetSettings } from 'src/app/web/modules/Widget/api/config/cookDataGridWidgetSettings';
import { WIDGET_CONFIG_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetConfigTypes';
import { randomNumber } from 'src/services/fakeDataGenerator';

export function cookDataGridConfig(listId, fieldsIds, fieldsNames) {
    const { ID: widgetType } = WIDGET_TYPES.DATA_GRID;
    const $type = WIDGET_CONFIG_TYPES.DATA_GRID;
    return {
        refId: randomNumber(),
        widgetType,
        settings: cookDataGridWidgetSettings({
            $type,
            listId,
            fieldsIds,
            fieldsNames,
        }),
    };
}
