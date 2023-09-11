import getFavorites from 'src/app/mobile/content/modules/Favorites/api/services/getFavorites';
import removeFavoritesByIds from 'src/app/mobile/content/modules/Favorites/api/services/removeFavoritesByIds';

export default async function removeAllFavorites(client) {
    const favoritesList = await getFavorites(client);
    const ids = favoritesList.reduce((acc, { data }) => {
        data.forEach(({ id }) => acc.push(id));
        return acc;
    }, []);
    await removeFavoritesByIds(client, ids);
}
