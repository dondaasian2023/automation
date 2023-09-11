import env from 'src/services/environment';
import { resetApp, sleep } from 'src/services/driver/driverActions';
import AuthActions from 'src/app/mobile/actions/authActions';
import entryActions from 'src/app/mobile/actions/entryActions';
import description from 'src/services/reporting/description';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import { deleteEntriesInList } from 'src/app/mobile/content/features/entryForm/api/services/deleteEntriesInList';
import { expect } from 'chai';
import {
    AUTOFILL_LIST_NAME,
    REFERENCE_FIELD_LABEL,
    AUTOFILL_REF_NAMES,
    refToAutofill,
} from 'src/app/mobile/content/modules/EntryFormEditor/specs/autoFill/mocks/mockData';
import EntryFormContainer from 'src/app/mobile/content/modules/EntryFormEditor/components/EntryFormContainer/EntryFormContainer';
import EntrySuccessActionBar from 'src/app/mobile/content/modules/EntryFormEditor/components/entrySuccessActionBar';
import GridWidgetPage from 'src/app/mobile/content/modules/Widget/GridWidget/gridWidgetPage';
import DetailGridWidget from 'src/app/mobile/content/modules/Widget/submodules/detailGridWidget';
import { uniqueName } from 'src/services/fakeDataGenerator';
import TextField from 'src/app/mobile/content/components/form/controls/textField';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import isObject from 'src/utils/types/isObject';
import { openList } from 'src/app/mobile/actions/listActions';
import theme from 'src/services/theme';
import ReferenceField from 'src/app/mobile/content/components/form/controls/referenceField';

const {
    USERS: [USER],
    ENV_URL,
} = env.default;

let restClient;

// TODO: Add mocked data for QA2 environment or implement creating via api
if (theme.isOP && env.isQA) {
    describe(description.applyEnv('Entry Form'), async () => {
        describe('Autofill', async () => {
            before(async () => {
                const resettingApp = resetApp();
                restClient = await authorize(ENV_URL, USER);
                await deleteEntriesInList(restClient, AUTOFILL_LIST_NAME);
                await resettingApp;
                await AuthActions.skipOnboardingScreens();
                await AuthActions.loginToApplication(USER);
            });

            it('Select option in reference to autofill field and validate entry field values', async () => {
                await entryActions.createNewEntry(AUTOFILL_LIST_NAME);
                let data = {};
                for (const refName of Object.values(AUTOFILL_REF_NAMES)) {
                    const entryName = uniqueName();
                    data = { ...data, [refName]: entryName };
                    await TextField('Name').setValue(entryName);
                    await ReferenceField(REFERENCE_FIELD_LABEL).setValue(refName);
                    await sleep(2000);

                    for (const { component, value } of refToAutofill.entryData) {
                        const renderedValue = await component.getValue();
                        const currentValue = value[refName];
                        const expected = isObject(currentValue)
                            ? currentValue.initial
                            : currentValue;
                        expect(renderedValue).to.eql(expected);
                    }

                    await EntryFormContainer.save();
                    if (!isLastProperty(refName)) {
                        await EntrySuccessActionBar.clickAddAnother();
                        await sleep(2000);
                    } else {
                        await EntrySuccessActionBar.close();
                    }
                }

                await openList(AUTOFILL_LIST_NAME);
                await GridWidgetPage.clickToggleButton();

                const refNames = Object.values(AUTOFILL_REF_NAMES);
                for (let i = 0; i < refNames.length; i++) {
                    const ref = refNames[i];
                    const refData = data[ref];
                    await GridWidgetPage.openCard(refData, i);
                    await DetailGridWidget.waitForOpened('', refData);
                    for (const {
                        component: { label },
                        value,
                    } of refToAutofill.entryData) {
                        const renderedValue = await DetailGridWidget.DetailsGridCard.getRowValue(
                            label
                        );
                        const expectedValue = isObject(value[ref]) ? value[ref].parsed : value[ref];
                        expect(renderedValue).to.eql(expectedValue);
                    }
                    await NavBar.clickBackIcon();
                }
            });
        });
    });
}

const isLastProperty = current => Object.values(AUTOFILL_REF_NAMES).pop() === current;
