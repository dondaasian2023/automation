import getEntriesInList from 'src/app/web/modules/EntryFeed/api/services/getEntriesInList';
import { getListId } from 'src/app/mobile/content/services/getListId';
import { deleteAllEntriesInList } from 'src/app/web/modules/GridEditor/api/services/deleteAllEntriesInList';

export const deleteEntriesInList = async (client, listName) => {
    const listId = await getListId(client, listName);
    const entriesList = await getEntriesInList(client, listId);
    const entryIds = entriesList.reduce((ids, entry) => {
        ids.push({ entryId: entry.id });
        return ids;
    }, []);
    await deleteAllEntriesInList(client, listId, entryIds);
};
