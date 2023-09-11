import env from 'src/services/environment';
import AuthActions from 'src/app/mobile/actions/authActions';
import entryActions from 'src/app/mobile/actions/entryActions';
import { expect } from 'chai';
import EntrySuccessActionBar from 'src/app/mobile/content/modules/EntryFormEditor/components/entrySuccessActionBar';
import GridWidgetPage from 'src/app/mobile/content/modules/Widget/GridWidget/gridWidgetPage';
import DetailGridWidget from 'src/app/mobile/content/modules/Widget/submodules/detailGridWidget';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import createListByConfig, {
    createDefaultLists,
} from 'src/app/web/modules/ListManagment/api/services/createListByConfig';
import { cookDefaultListConfig } from 'src/app/web/modules/ListManagment/api/config/listConfig';
import referenceField from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/referenceField';
import { uniqueName } from 'src/services/fakeDataGenerator';
import FIELD_NAMES from 'src/app/mobile/content/modules/EntryFormEditor/constants/fieldTypes';
import description from 'src/services/reporting/description';
import expectSuccessfullyMessageDisplayed from 'src/app/mobile/content/modules/EntryFormEditor/specs/services/expectations';
import { openList } from 'src/app/mobile/actions/listActions';
import { deleteLists } from 'src/app/web/modules/ListManagment/api/services/deleteList';
import { setFieldValues } from 'src/app/mobile/content/components/form/controls/services/entryFormFieldService';
import singleLineField from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/textFields/singleLineField';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

const { REFERENCE_FIELD } = FIELD_NAMES;
const referenceEntryName1 = uniqueName();
const referenceEntryName2 = uniqueName();
const sourceListName = uniqueName(REFERENCE_FIELD);
const sourceEntryName = uniqueName();

let listsToDelete = [sourceListName];

let entryConfig;
let restClient;

const cookTextFieldConfig = value => ({
    value,
    ...singleLineField({ name: 'Name' }),
});

const cookRefEntryConfig = referenceEntryName => ({
    fields: [cookTextFieldConfig(referenceEntryName)],
});

function cookReferenceFieldConfig({ field, referenceListName, entryConfig }) {
    return {
        ...field,
        value: {
            referenceListName,
            entryConfig,
        },
    };
}

describe(description.applyEnv('Entry Form'), async () => {
    describe('Reference Field', async () => {
        before(async () => {
            restClient = await authorize(ENV_URL, USER);

            const [reference1, reference2, reference3] = await createDefaultLists(restClient, 3);
            listsToDelete.push(reference1.name, reference2.name, reference3.name);

            const ref1 = referenceField(reference1.id);
            const ref2 = referenceField(reference2.id, reference3.id);

            entryConfig = [
                cookTextFieldConfig(sourceEntryName),
                cookReferenceFieldConfig({
                    field: ref1,
                    entryConfig: cookRefEntryConfig(referenceEntryName1),
                }),
                cookReferenceFieldConfig({
                    field: ref2,
                    referenceListName: reference2.name,
                    entryConfig: cookRefEntryConfig(referenceEntryName2),
                }),
            ];

            const listWithRefFieldConfig = await cookDefaultListConfig(restClient, sourceListName, {
                changedFields: [ref1, ref2],
            });

            await createListByConfig(restClient, listWithRefFieldConfig);
            await AuthActions.skipOnboardingScreens();
            await AuthActions.loginToApplication(USER);
        });

        it('Add new reference while adding new entry (one allowed list)', async () => {
            await entryActions.createNewEntry(sourceListName, () => setFieldValues(entryConfig));

            await expectSuccessfullyMessageDisplayed(sourceListName);
            await EntrySuccessActionBar.close();
        });
        // TODO: unskip when more settings ids will be fixed
        it.skip(`Created entry should be in first reference field`, async () => {
            await openList(sourceListName);

            await GridWidgetPage.clickToggleButton();
            await GridWidgetPage.openCard(sourceEntryName);
            await NavBar.waitForContextOpened(sourceListName);

            const [, { name }] = entryConfig;

            const actualReferenceField = await DetailGridWidget.DetailsGridCard.getRowValue(name);

            expect(
                actualReferenceField,
                `${actualReferenceField} value should be '${referenceEntryName1}'`
            ).to.eql(referenceEntryName1);
        });
        // TODO: unskip when more settings ids will be fixed
        it.skip(`Created entry should be in second reference field`, async () => {
            const [, , { name }] = entryConfig;
            const actualReferenceField = await DetailGridWidget.DetailsGridCard.getRowValue(name);

            expect(
                actualReferenceField,
                `${actualReferenceField} value should be ${referenceEntryName2}`
            ).to.eql(referenceEntryName2);
        });

        after(async () => {
            restClient = await authorize(ENV_URL, USER);
            await deleteLists(restClient, listsToDelete);
        });
    });
});
