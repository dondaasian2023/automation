export const cookReporters = () => ({
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                issueLinkTemplate: 'https://intapp.atlassian.net/browse/{}',
            },
        ],
    ],
});
