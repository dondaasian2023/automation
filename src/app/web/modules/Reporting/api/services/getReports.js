import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import urlWithParams from 'src/api/services/urlWithParams';
import REPORT_ROUTES from 'src/app/web/modules/Reporting/api/routes';

export function getReports(client, pageId = 1, entryId = 1) {
    const url = urlWithParams(REPORT_ROUTES.entryPages, { pageId, entryId });
    return client
        .getRequest(url)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
}
