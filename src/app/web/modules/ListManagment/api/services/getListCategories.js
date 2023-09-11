import { API_PREFIX } from 'src/constants/endpoints';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';

export default function getListCategories(client) {
    return client
        .getRequest(`${API_PREFIX}listManagement/lists/categories`)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
}
