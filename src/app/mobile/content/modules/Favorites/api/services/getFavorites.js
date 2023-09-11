import { MOBILE_API_PREFIX } from 'src/constants/endpoints';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';

export default function getFavorites(client) {
    return client
        .getRequest(`${MOBILE_API_PREFIX}favorites`)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
}
