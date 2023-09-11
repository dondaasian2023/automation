import { DESIRED_CAPABILITIES } from 'config/capabilities/desiredCapabilities';

require('dotenv').config();
import { PLATFORM_NAMES } from 'config/settings';
import { config } from 'config/wdio.conf';
import { androidInfo } from 'config/capabilities/android/android.info';

config.capabilities = [
    {
        maxInstances: 1,
        platformName: PLATFORM_NAMES.ANDROID,
        [DESIRED_CAPABILITIES.SHARED.AUTOMATION_NAME]: 'UIAutomator2',
        [DESIRED_CAPABILITIES.ANDROID.AUTO_GRANT_PERMISSIONS]: true,
        [DESIRED_CAPABILITIES.ANDROID.ALLOW_TEST_PACKAGES]: true,
        ...androidInfo,
    },
];

export { config };
