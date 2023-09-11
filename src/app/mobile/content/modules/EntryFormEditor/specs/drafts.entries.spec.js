require('dotenv').config();
import { expect } from 'chai';

import env from 'src/services/environment';
import description from 'src/services/reporting/description';
import { hideKeyboard, sleep } from 'src/services/driver/driverActions';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import { cookDefaultListConfig } from 'src/app/web/modules/ListManagment/api/config/listConfig';
import createListByConfig from 'src/app/web/modules/ListManagment/api/services/createListByConfig';
import {
    getFieldValue,
    setFieldValues,
} from 'src/app/mobile/content/components/form/controls/services/entryFormFieldService';
import AuthActions from 'src/app/mobile/actions/authActions';
import { uniqueName } from 'src/services/fakeDataGenerator';
import { changedFieldsConfigs } from 'src/app/mobile/content/modules/EntryFormEditor/specs/testData/changedFieldsConfigs';
import generateFieldData from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/generateFieldData';
import Main from 'src/app/mobile/content/core/pages/main';
import SelectEntryPage from 'src/app/mobile/content/modules/EntryFormEditor/components/ListSelection/selectEntryPage';
import TOUCH_ACTIONS from 'src/services/driver/touchActions';
import EntryFormContainer from 'src/app/mobile/content/modules/EntryFormEditor/components/EntryFormContainer/EntryFormContainer';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import MorePage, { ITEMS } from 'src/app/mobile/content/modules/More/pages/morePage';
import DraftsAndOfflineEntriesPage from 'src/app/mobile/content/modules/Settings/pages/draftsAndOfflineEntriesPage';
import getEntryNameByEntryConfig from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/getEntryNameByEntryConfig';
import { deleteList } from 'src/app/web/modules/ListManagment/api/services/deleteList';
import { openMore } from 'src/app/mobile/actions/mainActions';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

let restClient;
let listName;
let listConfig;
let entryConfig;
let entryName;

// TODO: Add accessibility id for EntryFormCurrency field
const fields = changedFieldsConfigs.reduce((prev, curr) => [...prev, ...curr.fields], []);

if (process.env.IS_RELEASE) {
    describe(description.applyEnv('Drafts Entries page'), async () => {
        before(async () => {
            restClient = await authorize(ENV_URL, USER);

            listName = uniqueName();
            listConfig = await cookDefaultListConfig(restClient, listName, {
                changedFields: fields,
            });

            await createListByConfig(restClient, listConfig);

            await AuthActions.skipOnboardingScreens();
            await AuthActions.loginToApplication(USER);
        });

        it('Fill entry details', async function () {
            entryConfig = generateFieldData(listConfig.changedFields);
            await Main.createNewEntry();
            await SelectEntryPage.waitForOpened();
            await SelectEntryPage.selectEntry(listName);

            await sleep(2000);
            if (driver.isAndroid) {
                await hideKeyboard(TOUCH_ACTIONS.TAP_OUTSIDE);
            }
            await setFieldValues(entryConfig);
        });

        it('Click "Save as Draft"', async function () {
            await EntryFormContainer.cancel();
            await NativeAlert.pressButton('Save as Draft');
        });

        it('Open "Drafts & Offline Entries"', async function ()  {
            // TODO: enable test for iOS when snapshot issue is resolved
            if(driver.isIOS) {
                this.skip();
            }

            await NavBar.clickCloseIcon();
            await openMore();
            await MorePage.navigate(ITEMS.DRAFTS_AND_OFFLINE_ENTRIES);
            await DraftsAndOfflineEntriesPage.waitForOpened();
        });

        it('Validate entry field values', async function () {
            // TODO: enable test for iOS when snapshot issue is resolved
            if(driver.isIOS) {
                this.skip();
            }

            entryName = getEntryNameByEntryConfig(entryConfig);
            await DraftsAndOfflineEntriesPage.openDraft(entryName, listName);

            for (const field of entryConfig) {
                const { value } = await getFieldValue(field);

                expect(
                    value,
                    `'${field.name}' field should have value '${field.displayedValue}'`
                ).to.eql(field.displayedValue);
            }
        });

        after(async () => {
            restClient = await authorize(ENV_URL, USER);
            await deleteList(restClient, listName);
        });
    });
}
