import { expect } from 'chai';
import env from 'src/services/environment';
import description from 'src/services/reporting/description';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import { cookDefaultListConfig } from 'src/app/web/modules/ListManagment/api/config/listConfig';
import createListByConfig from 'src/app/web/modules/ListManagment/api/services/createListByConfig';
import { uniqueName } from 'src/services/fakeDataGenerator';
import TEXT_FORMAT_TYPE from '@dealcloud/core/lib/constants/field/textFormatTypes';
import { getTextFieldByTextFormatType } from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/getFieldByFieldType';
import createEntry from 'src/app/mobile/content/features/entryForm/api/services/createEntry';
import AuthActions from 'src/app/mobile/actions/authActions';
import entryActions from 'src/app/mobile/actions/entryActions';
import LiveTypeSearchResults from 'src/app/mobile/content/features/entryForm/components/liveType/LiveTypeResults';
import { getControl } from 'src/app/mobile/content/components/form/controls/services/entryFormFieldService';

const { SingleLine, Email, PhoneNumber, URL } = TEXT_FORMAT_TYPE;
const LIVE_SEARCH_ENTRIES_COUNT = 2;

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

let restClient;
const listName = uniqueName('LiveTypeAhead');
let listConfig;

const LIVE_TYPE_AHEAD_SEARCH_CONFIG = {
    allowDuplicates: true,
    isFilterAssistedSearch: true,
    isUsedInLookupsEditable: true,
};

// DEVNOTE: Live Type ahead search works only with text field
const SUPPORTED_FIELD_TYPES = [SingleLine, Email, URL, PhoneNumber];

const cookFieldConfig = textFormatType => {
    const fieldConfig = getTextFieldByTextFormatType(textFormatType);
    return fieldConfig?.({
        name: textFormatType,
        config: LIVE_TYPE_AHEAD_SEARCH_CONFIG,
    });
};

const liveTypeFields = SUPPORTED_FIELD_TYPES.map(fieldType => cookFieldConfig(fieldType));

describe(description.applyEnv('Entry Form'), async () => {
    describe('Live type ahead search', async () => {
        before(async () => {
            restClient = await authorize(ENV_URL, USER);
            listConfig = await cookDefaultListConfig(restClient, listName, {
                changedFields: liveTypeFields,
            });
            await createListByConfig(restClient, listConfig);
            await createLiveTypeAheadEntries();
            await AuthActions.skipOnboardingScreens();
            await AuthActions.loginToApplication(USER);
        });

        it('Add entry into list', async () => {
            await entryActions.openEntryForm(listName);
            for (const fieldConfig of liveTypeFields) {
                const { name, fieldType, formatTypeId, formatSubTypeId } = fieldConfig;
                const Control = getControl({
                    name,
                    fieldType,
                    formatTypeId,
                    formatSubTypeId,
                    value: name,
                });

                await Control(name.toString()).setValue(name, { doHideKeyboard: false });

                for (let i = 0; i < LIVE_SEARCH_ENTRIES_COUNT; i++) {
                    const didYouMean = await LiveTypeSearchResults.didYouMean({
                        name: `${name}${i}`,
                    });
                    expect(await didYouMean.isElementDisplayed()).to.be.true;
                }

                await Control(name.toString())?.hideKeyboard();
            }
        });
    });
});

const createLiveTypeAheadEntries = async () => {
    const createEntryPromiseArray = [];
    for (const config of liveTypeFields) {
        for (let i = 0; i < LIVE_SEARCH_ENTRIES_COUNT; i++) {
            const entryFields = [
                {
                    name: 'Name',
                    value: `${config.name}${i}`,
                },
                {
                    name: config.name.toString(),
                    value: `${config.name}${i}`,
                },
            ];
            createEntryPromiseArray.push(
                createEntry(restClient, listName, {
                    fields: entryFields,
                })
            );
        }
    }
    return Promise.allSettled(createEntryPromiseArray);
};
