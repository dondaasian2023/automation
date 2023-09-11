import { cookWidgetConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookWidgetConfig';
import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';

const { CHART, MAP, DATA_CORTEX_GRID } = WIDGET_TYPES;

/**
 * @deprecated will be deleted
 */
export const widgetConfigs = [
    cookWidgetConfig(CHART.LABEL),
    cookWidgetConfig(MAP.LABEL),
    cookWidgetConfig(DATA_CORTEX_GRID.LABEL),
];
