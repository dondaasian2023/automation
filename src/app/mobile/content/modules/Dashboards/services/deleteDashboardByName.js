import { getReports } from 'src/app/web/modules/Reporting/api/services/getReports';
import { getEnvDashboardPageId } from 'src/app/web/modules/Dashboard/api/constants/getEnvDashboardPageId';
import { deleteReport } from 'src/app/web/modules/Reporting/api/services/deleteReport';
import TemplateReportTypes from '@dealcloud/core/lib/constants/templateReports/templateReportTypes';

export const deleteDashboardByName = async (restClient, reportName) => {
    const pageId = getEnvDashboardPageId();
    const reports = await getReports(restClient, pageId, -1);
    const dashboardId = getDashboardIdByName(reportName, reports);

    const reportsConfig = {
        reports: [
            {
                id: dashboardId,
                name: reportName,
                isDeleted: true,
            },
        ],
        pageType: TemplateReportTypes.ENTRY_LIST,
        id: pageId,
        name: 'Firm Level',
    };

    await deleteReport(restClient, reportsConfig);
};

export function getDashboardIdByName(dashboardName, reports) {
    return reports.reports.find(report => report.name === dashboardName)?.id;
}
