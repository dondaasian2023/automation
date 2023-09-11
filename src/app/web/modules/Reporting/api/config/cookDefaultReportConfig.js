import { generateUuid } from 'src/utils/generateUuid';
import { nowDate } from 'src/utils/dateUtils';
import { logger } from 'src/utils/logger';

export default function cookDefaultReportConfig(
    { pageId, name = `Report ${nowDate()}` } = {},
    userGroupIds
) {
    if (!pageId) {
        logger.error(`Cannot create reportConfig. Missing 'pageId'`);
        return;
    }

    const layout = {
        id: 0,
        layoutId: generateUuid(),
    };

    return {
        name,
        layout,
        pageId,
        userGroupIds, // TODO: Add default userGroupsIds
        id: -1,
        seqNumber: 1,
        isAllGroupsChecked: true,
        isAllEntryGroupsChecked: true,
        isConfigUpdated: true,
        height: 800,
        isWeb: true,
        isMobile: true,
    };
}
