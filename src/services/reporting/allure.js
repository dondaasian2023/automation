import allureReporter from '@wdio/allure-reporter';

const addStep = title => allureReporter.addStep(title);
addStep.pageShouldBeOpened = pageName => addStep(`${pageName} should be opened`);

export { addStep };
