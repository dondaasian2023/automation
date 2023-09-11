import { API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const USER_MANAGEMENT_ROUTES = {
    groups: 'userManagement/groups',
};
applyPrefix(API_PREFIX, USER_MANAGEMENT_ROUTES);
export default USER_MANAGEMENT_ROUTES;
