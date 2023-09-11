import qs from 'qs';
import { uniqueName } from 'src/services/fakeDataGenerator';
import { cookDefaultListConfig } from 'src/app/web/modules/ListManagment/api/config/listConfig';
import resolveListId from 'src/app/web/modules/ListManagment/api/services/resolveListId';
import LIST_MANAGEMENT_ROUTES from 'src/app/web/modules/ListManagment/api/routes';

export default async function createListByConfig(client, config) {
    const res = await client.postRequest(LIST_MANAGEMENT_ROUTES.save, qs.stringify(config));
    if (res.error) {
        throw Error(res.error);
    }
    return res;
}

async function createDefaultList(restClient, name = uniqueName()) {
    const defaultListConfig = await cookDefaultListConfig(restClient, name);
    await createListByConfig(restClient, defaultListConfig);
    const id = await resolveListId(restClient, name);
    return {
        id,
        name,
    };
}

// DEVNOTE: list must have a unique name. As long as the unique name generation function
//          (src/services/fakeDataGenerator) returns the same date time, we use a delay to ensure
//          this uniqueness
export async function createDefaultLists(restClient, count = 1) {
    const delayIncrement = 10;
    let delay = 0;
    let procedures = [];
    for (let i = 0; i < count; i++) {
        const procedure = new Promise(resolve => setTimeout(resolve, delay)).then(() =>
            createDefaultList(restClient)
        );
        delay += delayIncrement;
        procedures.push(procedure);
    }
    return Promise.all(procedures);
}
