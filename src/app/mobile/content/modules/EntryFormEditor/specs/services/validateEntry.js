import { addStep } from 'src/services/reporting/allure';
import DetailGridWidget from 'src/app/mobile/content/modules/Widget/submodules/detailGridWidget';
import { expect } from 'chai';

export default async function validateEntry(entryFields) {
    addStep('Validate entry data');
    const expectedResults = [];
    const actualResults = [];

    for (const { name, displayedValue } of entryFields) {
        const currentFieldValue = await DetailGridWidget.DetailsGridCard.getRowValue(name);

        expectedResults.push({
            name,
            value: displayedValue,
        });

        actualResults.push({ name, value: currentFieldValue });
    }

    expect(
        actualResults,
        `Displayed entry data should be equal to the entered, but some fields have incorrect values.\nActual: ${JSON.stringify(
            actualResults
        )}\nExpected : ${JSON.stringify(expectedResults)}`
    ).to.eql(expectedResults);
}
