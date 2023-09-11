import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { WIDGET_CONFIG_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetConfigTypes';
import { cookTextWindowWidgetSettings } from 'src/app/web/modules/Widget/api/config/cookTextWIndowWidgetSettings';
import { randomNumber } from 'src/services/fakeDataGenerator';

export function cookTextWindowConfig() {
    const $type = WIDGET_CONFIG_TYPES.TEXT_WINDOW;
    return {
        refId: randomNumber(),
        widgetType: WIDGET_TYPES.TEXT_WINDOW.ID,
        settings: cookTextWindowWidgetSettings({
            $type,
        }),
    };
}
