require('dotenv').config();
import theme from 'src/services/theme';
import { DESIRED_CAPABILITIES } from 'config/capabilities/desiredCapabilities';

export const androidInfo = {
    [DESIRED_CAPABILITIES.SHARED.DEVICE_NAME]: process.env.ANDROID_DEVICE_NAME,
    [DESIRED_CAPABILITIES.SHARED.PLATFORM_VERSION]: process.env.ANDROID_PLATFORM_VERSION,
    [DESIRED_CAPABILITIES.SHARED.APP]: theme.select({
        dc: process.env.ANDROID_APP_DC,
        op: process.env.ANDROID_APP_OP,
    }),
    [DESIRED_CAPABILITIES.ANDROID.APP_WAIT_ACTIVITY]: '*.MainActivity',
};
