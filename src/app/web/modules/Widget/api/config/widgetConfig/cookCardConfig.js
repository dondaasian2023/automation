import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { WIDGET_CONFIG_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetConfigTypes';
import { cookCardWidgetSettings } from 'src/app/web/modules/Widget/api/config/cookCardWidgetSettings';
import { randomNumber } from 'src/services/fakeDataGenerator';

export function cookCardConfig(listId, fieldsIds, fieldsNames) {
    const { ID: widgetType } = WIDGET_TYPES.CARD;
    const $type = WIDGET_CONFIG_TYPES.CARD;
    return {
        refId: randomNumber(),
        widgetType,
        settings: cookCardWidgetSettings({
            $type,
            listId,
            fieldsIds,
            fieldsNames,
        }),
    };
}
