import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import getFavoritesInList from 'src/app/mobile/content/modules/Favorites/api/services/getFavoritesInList';
import getFavorites from 'src/app/mobile/content/modules/Favorites/api/services/getFavorites';
import removeFavoritesByIds from 'src/app/mobile/content/modules/Favorites/api/services/removeFavoritesByIds';

const getFavoritesIds = arr => arr.map(item => item.id);

export default async function removeAllFavoritesInList(client, listName) {
    const favoritesList = await getFavorites(client)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);

    const favoritesToRemove = getFavoritesInList(favoritesList, listName);
    const ids = getFavoritesIds(favoritesToRemove);
    await removeFavoritesByIds(client, ids);
}
