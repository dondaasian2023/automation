import { API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const MENU_ROUTES = {
    entryDetails: 'menu/entryDetails',
};
applyPrefix(API_PREFIX, MENU_ROUTES);
export default MENU_ROUTES;
