## List config

```
{
  // Required fields: 

  pluralName: string,
  singularName: string,
  entryListType: number,
  sourceEntryListId: number,
  sourceEntryListId: number,
  deduplicateFieldConfigs: [{ fieldId: number, isSaveKey: boolean }],
  entryForm: {
  
  //Optional field
        choiceId: number,
        
        // Required fields
        tabs: [
            {
                name: string,
                rows: [{ layoutConfig: [{ fieldId: number, startPosition: number, width: number }] }],
            },
        ],
    },
    
    // Optional fields:
    
  entryAvailabilityType: [] number,
  goToDetailPageOnCreateNew: boolean,
  hasDashboard: boolean,
  internalNote: string,
  isAllowExclusions: boolean,
  isChanged: boolean,
  isCreateEntriesDynamically: boolean,
  isEntryLevelCapabilities: boolean,
  isInFullSearch: boolean,
  isInQuickSearch: boolean,
  isInheritedCapabilities: boolean,
  isShownInNavigation: boolean,
  isUserFieldSelection: boolean,
  isVLookupMapping: boolean  
};
```

## Field config: 

```
{
    // Required fields:

    fieldType: number,
    formatSubTypeId: number,
    formatTypeId: number,
    id: number,
    name: string,
    order: number,
    systemFieldType: number,
    templateId: number,
    uniqueId: number,

    // Optional fields:

    allowDuplicates: boolean,
    choiceFieldOptions: string,
    conversionCurrencyFieldId: number,
    enableAutoPdf: boolean,
    formulaStatus: number,
    formulaType: number,
    index: number,
    isAttachment: boolean,
    isCalculated: boolean,
    isCascadeDeletionEnabled: boolean,
    isChanged: boolean,
    isCheckedConversionField: boolean,
    isDataEditable: boolean,
    isDeletableInitial: boolean,
    isDeletable: boolean,
    isDisplayInactiveUsers: boolean,
    isEditable: boolean,
    isFilterAssistedSearch: boolean,
    isInheritDataOnNew: boolean,
    isKey: boolean,
    isMoney: boolean,
    isMultiSelect: boolean,
    isMultiselect: boolean,
    isName: boolean,
    isReferencesEditable: boolean,
    isRequired: boolean,
    isRichText: boolean,
    isSmartField: boolean,
    isStepByStepEnforced: boolean,
    isUsedInLookupsEditable: boolean,
    isUsedInLookups: boolean,
    isUsedInNotifications: boolean,
    isUsedInWorkflows: boolean,
    listId: number,
    notificationDisplayOrder: number,
    notificationDisplayType: number,
    referenceFieldId: number,
    sourceTypeId: number,
    textFormatType: number
};
```

## Usage example: 

```js
//Before test
const apiClient = await authorize(USER);

//Test 

//Prepare list config
const listConfig = cookDefaultListConfig('Name for List');

//Create list with configured config
const list = await createList(apiClient, listConfig);

//Delete list
await deleteList(apiClient, list);
```