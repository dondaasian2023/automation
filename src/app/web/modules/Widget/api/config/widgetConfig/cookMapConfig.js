import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { WIDGET_CONFIG_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetConfigTypes';
import { cookMapWidgetSettings } from 'src/app/web/modules/Widget/api/config/cookMapWidgetSettings';

export function cookMapConfig() {
    const { ID: widgetType, keys } = WIDGET_TYPES.MAP;
    const $type = WIDGET_CONFIG_TYPES.MAP;
    return {
        refId: 1234567890123,
        widgetType,
        settings: cookMapWidgetSettings({
            $type,
            keys,
        }),
    };
}
