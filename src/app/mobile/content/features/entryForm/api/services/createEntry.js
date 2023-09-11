import getListFields from 'src/app/web/modules/Lists/api/services/getListFields';
import setIdsForFields from 'src/app/mobile/content/features/entryForm/api/setIdsForFields';
import validateEntryForm from 'src/app/mobile/content/features/entryForm/api/services/validateEntryForm';
import saveEntryForm from 'src/app/mobile/content/features/entryForm/api/services/saveEntryForm';
import { getListId } from 'src/app/mobile/content/services/getListId';

export default async function createEntry(client, listName, { fields, files = [] } = {}) {
    if (!fields) return;

    // DEVNOTE: id=1 is initially indicated and should not be changed while creating a new entry
    const entryId = -1;

    const listId = await getListId(client, listName);
    const listFields = await getListFields(client, listId);
    const entryDataToCreate = {
        files,
        fields: setIdsForFields(fields, listFields),
    };
    await validateEntryForm(client, listId, entryId, entryDataToCreate);
    const entryData = await saveEntryForm(client, listId, entryId, entryDataToCreate);
    return {
        entryData,
        listId,
    };
}
