import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import LISTS_ROUTES from 'src/app/web/modules/Lists/api/routes';
import urlWithParams from 'src/api/services/urlWithParams';

export default function getListFields(client, listId) {
    const url = urlWithParams(LISTS_ROUTES.fields, { listId });
    return client
        .getRequest(url)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
}
