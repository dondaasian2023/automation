import { hasStatusCode } from 'src/api/services/responseService';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import REPORT_ROUTES from 'src/app/web/modules/Reporting/api/routes';

export const createReport = async (client, dashboardConfig) =>
    client
        .postRequest(REPORT_ROUTES.pages, dashboardConfig)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK));
