import { expect } from 'chai';
import { addStep } from 'src/services/reporting/allure';

async function expectScreenEmptyTitleDisplayed(screenEmptyComponent) {
    const expectedTitle = screenEmptyComponent.text;
    addStep(`Empty screen title should be: ${expectedTitle}`);
    expect(
        await screenEmptyComponent.isTitleDisplayed(),
        `Empty screen title "${expectedTitle}" should be displayed`
    ).to.be.true;
}

async function expectScreenEmptyTextDisplayed(screenEmptyComponent) {
    const expectedText = screenEmptyComponent.text;
    addStep(`Empty screen text should be: ${expectedText}`);
    expect(
        await screenEmptyComponent.isTextDisplayed(),
        `Empty screen text "${expectedText}" should be displayed`
    ).to.be.true;
}

export async function expectScreenEmptyDisplayed(screenEmptyComponent) {
    await expectScreenEmptyTitleDisplayed(screenEmptyComponent);
    await expectScreenEmptyTextDisplayed(screenEmptyComponent);
}
