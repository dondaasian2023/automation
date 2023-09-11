import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { WIDGET_CONFIG_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetConfigTypes';
import { randomNumber } from 'src/services/fakeDataGenerator';
import { cookCalendarWidgetSettings } from 'src/app/web/modules/Widget/api/config/cookCalendarWidgetSettings';

export function cookCalendarConfig(listId, listFields) {
    const { ID: widgetType } = WIDGET_TYPES.CALENDAR;
    const $type = WIDGET_CONFIG_TYPES.CALENDAR;
    return {
        refId: randomNumber(),
        widgetType,
        settings: cookCalendarWidgetSettings({ $type, listId, listFields }),
    };
}
