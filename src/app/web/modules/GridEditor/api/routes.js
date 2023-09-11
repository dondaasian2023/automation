import { API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const GRID_EDITOR_ROUTES = {
    save: 'gridEditor/save',
};
applyPrefix(API_PREFIX, GRID_EDITOR_ROUTES);
export default GRID_EDITOR_ROUTES;
