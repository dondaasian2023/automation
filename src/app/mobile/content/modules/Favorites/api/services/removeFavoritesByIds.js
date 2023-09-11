import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import removeFavorites from 'src/app/mobile/content/modules/Favorites/api/services/removeFavorites';
import { hasStatusCode } from 'src/api/services/responseService';

export default function removeFavoritesByIds(client, ids) {
    const responses = removeItems(client, ids);
    return Promise.all(responses);
}

function removeItems(client, ids) {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return ids.map(item =>
        removeFavorites(client, item).then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
    );
}
