import getListCategories from 'src/app/web/modules/ListManagment/api/services/getListCategories';
import { EntryAvailabilityTypesIds, EntryListTypes } from '@dealcloud/core/lib/constants';
import cookEntryFormListConfig from 'src/app/web/modules/ListManagment/api/config/listConfig/cookEntryFormListConfig';
import applyCommonOptionsToFields from 'src/app/web/modules/ListManagment/api/config/listConfig/applyCommonOptionsToFields';
import { DEFAULT_FIELDS } from 'src/app/web/modules/ListManagment/api/config/listConfig/defaultConfig';

export default async function cookDefaultListConfig(
    client,
    listName,
    { changedFields = [] } = {},
    {
        entryListType = EntryListTypes.Entity,
        deduplicateFieldConfigs = [{ fieldId: -1, isSaveKey: false }],
    } = {}
) {
    const { id: sourceEntryListId } = (await getListCategories(client)).find(
        item => item.entryListType === entryListType
    );

    changedFields = applyCommonOptionsToFields([...DEFAULT_FIELDS, ...changedFields]);

    return cookListConfig(
        listName,
        {
            entryListType,
            sourceEntryListId,
            deduplicateFieldConfigs,
        },
        changedFields
    );
}

function cookListConfig(listName, predefinedValues, changedFields) {
    return {
        ...predefinedValues,
        pluralName: listName,
        singularName: listName,
        changedFields: changedFields,
        // TODO : optional fields for search and entryReports
        isVLookupMapping: true,
        isShownInNavigation: true,
        goToDetailPageOnCreateNew: true,
        isInFullSearch: true,
        isInQuickSearch: true,
        hasDashboard: true,
        entryAvailabilityType: [
            EntryAvailabilityTypesIds.WebAddMenu,
            EntryAvailabilityTypesIds.MobileAddMenu,
            EntryAvailabilityTypesIds.WebEntryForms,
            EntryAvailabilityTypesIds.BulkEditor,
        ],
        entryForm: cookEntryFormListConfig(changedFields),
    };
}
