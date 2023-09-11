require('dotenv').config();
import { config } from 'config/wdio.conf';
import { iosInfo } from 'config/capabilities/ios/ios.info';
import { DESIRED_CAPABILITIES } from 'config/capabilities/desiredCapabilities';
import { PLATFORM_NAMES } from 'config/settings';

config.capabilities = [
    {
        platformName: PLATFORM_NAMES.IOS,
        maxInstances: 1,
        [DESIRED_CAPABILITIES.SHARED.AUTOMATION_NAME]: 'XCUITest',
        [DESIRED_CAPABILITIES.SHARED.UDID]: 'auto',
        [DESIRED_CAPABILITIES.IOS.LOCATION_SERVICES_ENABLED]: true,
        [DESIRED_CAPABILITIES.IOS.AUTO_ACCEPT_ALERTS]: true,
        [DESIRED_CAPABILITIES.IOS.LOCATION_SERVICES_AUTHORIZED]: true,
        ...iosInfo,
    },
];

export { config };
