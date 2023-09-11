import { MOBILE_API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const ENTRY_FORM_ROUTES = {
    validate: 'form/lists/{listId}/entries/{entryId}/validate',
    save: 'form/lists/{listId}/entries/{entryId}/save',
};
applyPrefix(MOBILE_API_PREFIX, ENTRY_FORM_ROUTES);

export default ENTRY_FORM_ROUTES;
