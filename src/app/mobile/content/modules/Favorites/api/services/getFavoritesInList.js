import isUndefined from 'src/utils/types/isUndefined';

export default function getFavoritesInList(favoritesList, listName) {
    const items = favoritesList.find(({ name }) => name === listName);
    if (isUndefined(items)) {
        return [];
    }
    return items.data;
}
