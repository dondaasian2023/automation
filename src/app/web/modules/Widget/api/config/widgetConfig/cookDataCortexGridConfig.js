import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { WIDGET_CONFIG_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetConfigTypes';
import { cookDataCortexGridWidgetSettings } from 'src/app/web/modules/Widget/api/config/cookDataCortexGridWIdgetSettings';

export function cookDataCortexGridConfig() {
    const { ID: widgetType, keys } = WIDGET_TYPES.DATA_CORTEX_GRID;
    const $type = WIDGET_CONFIG_TYPES.DATA_CORTEX_GRID;
    return {
        refId: 1651066125884,
        widgetType,
        settings: cookDataCortexGridWidgetSettings({
            $type,
            keys,
        }),
    };
}
