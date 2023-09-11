import { BROWSERS } from 'config/settings';
import chromeOptions from 'config/wdio/chromeOptions.json';

export const cookServices = () => ({
    services: [
        [
            'appium',
            {
                command: 'appium',
                args: {
                    relaxedSecurity: true,
                },
            },
        ],
        [
            'chromedriver',
            {
                enableWebviewDetailsCollection: true,
                logFileName: 'wdio-chromedriver.log',
                outputDir: 'logs/driver-logs',
                capabilities: [
                    {
                        browserName: BROWSERS.CHROME,
                        chromeOptions: { ...chromeOptions },
                    },
                ],
            },
        ],
    ],
});
