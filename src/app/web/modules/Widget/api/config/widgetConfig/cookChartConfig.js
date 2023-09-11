import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { WIDGET_CONFIG_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetConfigTypes';
import { cookChartWidgetSettings } from 'src/app/web/modules/Widget/api/config/cookChartWidgetSettings';

export function cookChartConfig() {
    const { ID: widgetType, keys } = WIDGET_TYPES.CHART;
    const $type = WIDGET_CONFIG_TYPES.PIVOT_GRID;
    return {
        refId: 1650883391434,
        widgetType,
        settings: cookChartWidgetSettings({
            $type,
            keys,
        }),
    };
}
