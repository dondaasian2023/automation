import deleteListById from 'src/app/web/modules/ListManagment/api/services/deleteListById';
import resolveListId from 'src/app/web/modules/ListManagment/api/services/resolveListId';

export async function deleteList(client, name) {
    const id = await resolveListId(client, name);
    return deleteListById(client, id);
}

export const deleteLists = async (client, listNames = []) =>
    Promise.all(listNames?.map(name => deleteList(client, name)));
