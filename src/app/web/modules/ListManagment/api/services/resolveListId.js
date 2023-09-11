import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import urlWithParams from 'src/api/services/urlWithParams';
import LIST_MANAGEMENT_ROUTES from 'src/app/web/modules/ListManagment/api/routes';

export default async function resolveListId(client, listName) {
    const url = urlWithParams(LIST_MANAGEMENT_ROUTES.filter, { listName });
    const row = await client
        .getRequest(url)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractRow);

    if (!row) {
        throw Error(`Cannot resolve id for '${listName}' list.`);
    }

    return row.id;
}

function extractRow(response) {
    const [row = null] = extractModel(response)?.rows ?? [];
    return row;
}
