import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import MENU_ROUTES from 'src/app/web/modules/Menu/api/routes';

export default function getEntryDetails(client) {
    return client
        .getRequest(MENU_ROUTES.entryDetails)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
}
