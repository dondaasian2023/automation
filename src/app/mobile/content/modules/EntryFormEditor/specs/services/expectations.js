import { addStep } from 'src/services/reporting/allure';
import { expect } from 'chai';
import EntrySuccessActionBar from 'src/app/mobile/content/modules/EntryFormEditor/components/entrySuccessActionBar';

export default async function expectSuccessfullyMessageDisplayed(sourceListName) {
    addStep('Validate successfully message');
    expect(
        await EntrySuccessActionBar.isSuccessfullyMessageDisplayed(sourceListName),
        'Entry success message should be displayed'
    ).to.be.true;
}
