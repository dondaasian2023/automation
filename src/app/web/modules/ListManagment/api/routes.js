import { API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const LIST_MANAGEMENT_ROUTES = {
    save: 'listManagement/lists/save',
    delete: 'listManagement/lists/{listId}/delete',
    filter: 'listManagement/lists?filter={listName}',
};
applyPrefix(API_PREFIX, LIST_MANAGEMENT_ROUTES);
export default LIST_MANAGEMENT_ROUTES;
