import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import CATEGORIES_ROUTES from 'src/app/web/modules/Categories/api/routes';

// DEVNOTE: is used to obtain all existing lists in app
export const getCategoriesLists = async client =>
    client
        .getRequest(CATEGORIES_ROUTES.lists)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
