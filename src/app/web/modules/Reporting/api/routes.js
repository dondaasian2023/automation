import { API_PREFIX } from 'src/constants/endpoints';
import applyPrefix from 'src/app/mobile/content/core/api/apiService/applyPrefix';

const REPORT_ROUTES = {
    pages: 'reporting/pages',
    entryPages: 'reporting/pages/{pageId}/mode/false/entryId/{entryId}',
};
applyPrefix(API_PREFIX, REPORT_ROUTES);
export default REPORT_ROUTES;
