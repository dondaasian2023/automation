import env from 'src/services/environment';
import description from 'src/services/reporting/description';
import { resetApp, setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import { cookDefaultListConfig } from 'src/app/web/modules/ListManagment/api/config/listConfig';
import createListByConfig from 'src/app/web/modules/ListManagment/api/services/createListByConfig';
import entryActions from 'src/app/mobile/actions/entryActions';
import { setFieldValues } from 'src/app/mobile/content/components/form/controls/services/entryFormFieldService';
import AuthActions from 'src/app/mobile/actions/authActions';
import { AUTO_TEST_PREFIX, uniqueName } from 'src/services/fakeDataGenerator';
import { changedFieldsConfigs } from 'src/app/mobile/content/modules/EntryFormEditor/specs/testData/changedFieldsConfigs';
import generateFieldData from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/generateFieldData';
import expectSuccessfullyMessageDisplayed from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/expectations';
import getEntryNameByEntryConfig from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/getEntryNameByEntryConfig';
import { cookFullEntryConfig } from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/cookFullEntryConfig';
import validateEntry from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/validateEntry';
import { deleteList } from 'src/app/web/modules/ListManagment/api/services/deleteList';
import { FIELD_TYPES_NAMES_MAP } from 'src/app/mobile/content/features/entryForm/fieldNamesMap';
import { SNAPSHOT_DEPTH_MAX_VALUE_100 } from 'config/settings';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

let restClient;
let sourceListName;
let entryName;
let listConfig;
let entryConfig;
let fullEntryConfig;

describe(description.applyEnv('Entry Form'), async () => {
    changedFieldsConfigs.forEach(function ({ fieldType, fields }) {
        {
            const fieldTypeString = FIELD_TYPES_NAMES_MAP[fieldType];

            describe(`List with ${fieldTypeString} field types`, async () => {
                before(async () => {
                    const appResetting = resetApp();
                    restClient = await authorize(ENV_URL, USER);

                    sourceListName = uniqueName(`${AUTO_TEST_PREFIX}${fieldTypeString}`);
                    listConfig = await cookDefaultListConfig(restClient, sourceListName, {
                        changedFields: fields,
                    });

                    await createListByConfig(restClient, listConfig);
                    entryConfig = generateFieldData(listConfig.changedFields);

                    await appResetting;
                    await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);

                    await AuthActions.skipOnboardingScreens();
                    await AuthActions.loginToApplication(USER);
                });

                it('Add entry into list', async () => {
                    await entryActions.createNewEntry(sourceListName, () =>
                        setFieldValues(entryConfig)
                    );
                    await expectSuccessfullyMessageDisplayed(sourceListName);
                });

                it('Validate created entry details', async function(){
                    entryName = getEntryNameByEntryConfig(entryConfig);
                    fullEntryConfig = cookFullEntryConfig(entryConfig, {
                        createdBy: USER,
                        modifiedBy: USER,
                    });

                    await entryActions.openEntryByName(sourceListName, entryName);
                    await validateEntry(fullEntryConfig);
                });

                after(async () => {
                    restClient = await authorize(ENV_URL, USER);
                    await deleteList(restClient, sourceListName);
                });
            });
        }
    });
});
