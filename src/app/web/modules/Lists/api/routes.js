import { API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const LISTS_ROUTES = {
    fields: 'lists/{listId}/fields',
};
applyPrefix(API_PREFIX, LISTS_ROUTES);
export default LISTS_ROUTES;
