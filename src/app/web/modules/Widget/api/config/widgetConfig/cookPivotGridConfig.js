import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { WIDGET_CONFIG_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetConfigTypes';
import { cookPivotGridWidgetSettings } from 'src/app/web/modules/Widget/api/config/cookPivotGridWidgetSettings';
import { randomNumber } from 'src/services/fakeDataGenerator';

export function cookPivotGridConfig(listId, fieldsIds, fieldsNames) {
    const { ID: widgetType } = WIDGET_TYPES.PIVOT_GRID;
    const $type = WIDGET_CONFIG_TYPES.PIVOT_GRID;
    return {
        refId: randomNumber(),
        widgetType,
        settings: cookPivotGridWidgetSettings({
            $type,
            listId,
            fieldsIds,
            fieldsNames,
        }),
    };
}
