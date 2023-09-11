import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { cookPivotGridConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookPivotGridConfig';
import { cookDataGridConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookDataGridConfig';
import { cookCalendarConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookCalendarConfig';
import { cookChartConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookChartConfig';
import { cookMapConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookMapConfig';
import { cookCardConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookCardConfig';
import { cookDataCortexGridConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookDataCortexGridConfig';
import { cookTextWindowConfig } from 'src/app/web/modules/Widget/api/config/widgetConfig/cookTextWindowConfig';

/**
 * @deprecated use `configureWidget`
 */
export function cookWidgetConfig(widgetType) {
    switch (widgetType) {
        case WIDGET_TYPES.CHART.LABEL:
            return cookChartConfig();
        case WIDGET_TYPES.MAP.LABEL:
            return cookMapConfig();
        case WIDGET_TYPES.DATA_CORTEX_GRID.LABEL:
            return cookDataCortexGridConfig();
    }
}

export function configureWidget(widgetType, listId, fieldsIds, listFields, fieldsNames) {
    switch (widgetType) {
        case WIDGET_TYPES.PIVOT_GRID.LABEL:
            return cookPivotGridConfig(listId, fieldsIds, fieldsNames);
        case WIDGET_TYPES.DATA_GRID.LABEL:
            return cookDataGridConfig(listId, fieldsIds, fieldsNames);
        case WIDGET_TYPES.TEXT_WINDOW.LABEL:
            return cookTextWindowConfig();
        case WIDGET_TYPES.CALENDAR.LABEL:
            return cookCalendarConfig(listId, listFields, fieldsNames);
        case WIDGET_TYPES.CARD.LABEL:
            return cookCardConfig(listId, fieldsIds, fieldsNames);
    }
}
