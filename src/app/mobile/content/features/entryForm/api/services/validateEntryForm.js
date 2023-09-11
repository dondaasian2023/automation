import urlWithParams from 'src/api/services/urlWithParams';
import ENTRY_FORM_ROUTES from 'src/app/mobile/content/features/entryForm/api/routes';
import { hasStatusCode } from 'src/api/services/responseService';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';

export default function validateEntryForm(client, listId, entryId, entryFieldCollection) {
    const url = urlWithParams(ENTRY_FORM_ROUTES.validate, { listId, entryId });
    return client
        .postRequest(url, entryFieldCollection)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK));
}
