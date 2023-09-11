import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import USER_MANAGEMENT_ROUTES from 'src/app/web/modules/UserManagment/api/routes';

export default function getUserGroups(client, { filter = '', page = 1, rows = 9999 } = {}) {
    return client
        .getRequest(USER_MANAGEMENT_ROUTES.groups)
        .query({
            filter,
            page,
            rows,
        })
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
}
