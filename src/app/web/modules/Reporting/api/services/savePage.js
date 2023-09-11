import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import REPORT_ROUTES from 'src/app/web/modules/Reporting/api/routes';

export default function savePage(client, pageConfig) {
    return client
        .postRequest(REPORT_ROUTES.pages, pageConfig)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
}
