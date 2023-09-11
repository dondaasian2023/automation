import { API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const CATEGORIES_ROUTES = {
    lists: 'categories/lists',
};
applyPrefix(API_PREFIX, CATEGORIES_ROUTES);
export default CATEGORIES_ROUTES;
