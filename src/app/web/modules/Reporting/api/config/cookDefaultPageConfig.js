import TemplateReportTypes from '@dealcloud/core/lib/constants/templateReports/templateReportTypes';

export default function cookDefaultPageConfig({ pageId, entryListId, name } = {}, ...reports) {
    return {
        reports,
        name,
        id: pageId,
        pageEntryListId: entryListId,
        pageType: TemplateReportTypes.ENTRY,
        height: 800,
    };
}
