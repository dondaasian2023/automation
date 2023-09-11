import resolveListId from 'src/app/mobile/content/services/resolveListId';
import { getCategoriesLists } from 'src/app/web/modules/Categories/api/getCategoriesLists';

export const getListId = async (restClient, listName) => {
    const allLists = await getCategoriesLists(restClient);
    return resolveListId(restClient, allLists, listName);
};
