import TemplateReportTypes from '@dealcloud/core/lib/constants/templateReports/templateReportTypes';
import { getEnvDashboardPageId } from 'src/app/web/modules/Dashboard/api/constants/getEnvDashboardPageId';
import { logger } from 'src/utils/logger';
import { cookReportConfig } from 'src/app/web/modules/Reporting/api/config/cookReportConfig';

export default function cookDashboardConfig({
    widgets,
    layout,
    userGroups,
    name,
    mobileWidgets,
    isDeleted,
}) {
    if (!widgets) {
        logger.warn('Missed parameter: "widgets".');
    }
    const pageId = getEnvDashboardPageId();
    return {
        id: pageId,
        reports: [
            cookReportConfig({ layout, widgets, userGroups, name, mobileWidgets, isDeleted }),
        ],
        pageType: TemplateReportTypes.ENTRY_LIST,
        name: 'Firm Level',
    };
}
