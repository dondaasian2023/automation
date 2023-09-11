export const DESIRED_CAPABILITIES = {
    SHARED: {
        DEVICE_NAME: 'appium:deviceName',
        PLATFORM_VERSION: 'appium:platformVersion',
        APP: 'appium:app',
        AUTOMATION_NAME: 'appium:automationName',
        UDID: 'appium:udid',
    },
    IOS: {
        AUTO_ACCEPT_ALERTS: 'appium:autoAcceptAlerts',
        LOCATION_SERVICES_ENABLED: 'appium:locationServicesEnabled',
        LOCATION_SERVICES_AUTHORIZED: 'appium:locationServicesAuthorized',
    },
    ANDROID: {
        AUTO_GRANT_PERMISSIONS: 'appium:autoGrantPermissions',
        ALLOW_TEST_PACKAGES: 'appium:allowTestPackages',
        APP_WAIT_ACTIVITY: 'appium:appWaitActivity',
    },
};
