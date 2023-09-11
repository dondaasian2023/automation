import urlWithParams from 'src/api/services/urlWithParams';
import LIST_MANAGEMENT_ROUTES from 'src/app/web/modules/ListManagment/api/routes';

export default function deleteListById(client, listId) {
    const url = urlWithParams(LIST_MANAGEMENT_ROUTES.delete, { listId });
    return client.postRequest(url);
}
