import { WIDGET_TYPES } from 'src/app/web/modules/Dashboard/api/constants/widgetTypes';
import { paragraph } from 'src/services/fakeDataGenerator';

export function cookTextWindowWidgetSettings({ $type, richText = paragraph() }) {
    return {
        $type,
        title: WIDGET_TYPES.TEXT_WINDOW.LABEL,
        richText,
    };
}
