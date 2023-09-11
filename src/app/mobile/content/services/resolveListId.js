export default function resolveListId(client, lists, listName) {
    const listId = lists?.find(({ name }) => name === listName)?.id;
    if (!listId) {
        throw Error(`Cannot find list with name '${listName}'`);
    }
    return listId;
}
