require('dotenv').config();
import theme from 'src/services/theme';
import { DESIRED_CAPABILITIES } from 'config/capabilities/desiredCapabilities';

export const iosInfo = {
    [DESIRED_CAPABILITIES.SHARED.DEVICE_NAME]: process.env.IOS_DEVICE_NAME,
    [DESIRED_CAPABILITIES.SHARED.PLATFORM_VERSION]: process.env.IOS_PLATFORM_VERSION,
    [DESIRED_CAPABILITIES.SHARED.APP]: theme.select({
        dc: process.env.IOS_APP_DC,
        op: process.env.IOS_APP_OP,
    }),
};
