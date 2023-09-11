import urlWithParams from 'src/api/services/urlWithParams';
import ENTRY_FORM_ROUTES from 'src/app/mobile/content/features/entryForm/api/routes';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import isNonEmptyArray from 'src/utils/types/isNonEmptyArray';
import { logger } from 'src/utils/logger';

export default async function saveEntryForm(client, listId, entryId, entryFieldCollection) {
    const url = urlWithParams(ENTRY_FORM_ROUTES.save, { listId, entryId });
    const fieldsData = await client
        .postRequest(url, entryFieldCollection)
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);

    const fieldsWithError = fieldsData.filter(field => !!field.error);
    if (isNonEmptyArray(fieldsWithError)) {
        logger.warn(`Error while POST ${url}. Please check provided fields config.`);
        logger.debug(`Errors: ${JSON.stringify(fieldsWithError, null, 2)}`);
    }

    return fieldsData;
}
