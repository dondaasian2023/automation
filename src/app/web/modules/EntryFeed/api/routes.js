import { API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const ENTRY_FEED_ROUTES = {
    entries: 'entryFeed/lists/{listId}/entries',
};
applyPrefix(API_PREFIX, ENTRY_FEED_ROUTES);
export default ENTRY_FEED_ROUTES;
