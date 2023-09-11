import getEntryDetails from 'src/app/web/modules/Menu/api/services/getEntryDetails';

export default async function getEntryDetailsByListName(client, listName) {
    const entryDetails = await getEntryDetails(client);
    return entryDetails?.items?.find(({ name }) => name === listName);
}
