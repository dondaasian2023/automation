import { logger } from 'src/utils/logger';
import { extractModel, hasStatusCode } from 'src/api/services/responseService';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import GRID_EDITOR_ROUTES from 'src/app/web/modules/GridEditor/api/routes';

export const deleteAllEntriesInList = async (client, entryListId, deletedItems) => {
    if (!deletedItems) {
        logger.warn(`There is no existing entries in the list with id=${entryListId}`);
        return;
    }

    return client
        .postRequest(GRID_EDITOR_ROUTES.save, {
            entryListId,
            deletedItems,
        })
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractModel);
};
