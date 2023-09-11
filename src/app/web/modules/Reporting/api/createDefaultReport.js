import getEntryDetailsByListName from 'src/app/web/modules/Menu/api/services/getEntryDetailsByListName';
import cookDefaultReportConfig from 'src/app/web/modules/Reporting/api/config/cookDefaultReportConfig';
import cookDefaultPageConfig from 'src/app/web/modules/Reporting/api/config/cookDefaultPageConfig';
import savePage from 'src/app/web/modules/Reporting/api/services/savePage';
import { useUserGroupsIds } from 'src/app/web/modules/UserManagment/api/useUserGroupsIds';

export default async function createDefaultReport(client, listName) {
    const userGroupIds = await useUserGroupsIds(client);
    const entryDetailsPage = await getEntryDetailsByListName(client, listName);
    const reportConfig = cookDefaultReportConfig(entryDetailsPage, userGroupIds);
    const pageConfig = cookDefaultPageConfig(entryDetailsPage, reportConfig);
    return savePage(client, pageConfig);
}
