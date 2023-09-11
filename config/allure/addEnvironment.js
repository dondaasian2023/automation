import allureReporter from '@wdio/allure-reporter';

function addEnvironment() {
    allureReporter.addEnvironment('PMA THEME', process.env.PMA_THEME);
    allureReporter.addEnvironment('ENV', process.env.ENV);
    allureReporter.addEnvironment('IS RELEASE', process.env.IS_RELEASE);
}

export default addEnvironment;
