import { MOBILE_API_PREFIX } from 'src/constants/endpoints';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { hasStatusCode } from 'src/api/services/responseService';

export default function getStatus(client) {
    return client
        .getRequest(`${MOBILE_API_PREFIX}status`)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK));
}
