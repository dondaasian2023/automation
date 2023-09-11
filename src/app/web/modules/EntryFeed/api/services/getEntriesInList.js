import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import urlWithParams from 'src/api/services/urlWithParams';
import ENTRY_FEED_ROUTES from 'src/app/web/modules/EntryFeed/api/routes';

export default function getEntriesInList(client, listId) {
    const url = urlWithParams(ENTRY_FEED_ROUTES, { listId });
    return client
        .getRequest(url)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
}
