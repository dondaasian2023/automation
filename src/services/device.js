const DEVICES = {
    IPHONE: 'iPhone',
    IPAD: 'iPad',
};

const currentDeviceName = () =>
    isIOS ? process.env.IOS_DEVICE_NAME : process.env.ANDROID_DEVICE_NAME;

function isIpad() {
    if (isIOS) {
        return currentDeviceName().includes(DEVICES.IPAD);
    }
}

const isIOS = driver.isIOS;

const device = {
    isIpad,
};

export default device;
