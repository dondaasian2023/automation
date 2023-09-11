import { MOBILE_API_PREFIX } from 'src/constants/endpoints';

export default function removeFavorites(client, id) {
    return client.postRequest(`${MOBILE_API_PREFIX}favorites/deleteEntry`, { id });
}
