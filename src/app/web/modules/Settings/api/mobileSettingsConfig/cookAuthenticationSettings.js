const DEFAULT_MDM_SETTINGS = {
    appPinCodeTouchEnabled: true,
    allowLoginFromUncontrolledDevices: true,
    allowLoginFromUncontrolledDevicesAndroid: true,
    allowOpenDocuments: true,
    allowGenerateReports: true,
    clearClipboardOnBackground: false,
    enforceAppEncryption: false,
    allowEmailAddressLinks: true,
    allowScreenRecording: true,
};

export const cookAuthenticationSettings = ({
    appPinCodeTouchEnabled = true,
    allowLoginFromUncontrolledDevices = true,
    allowLoginFromUncontrolledDevicesAndroid = true,
    allowOpenDocuments = true,
    allowGenerateReports = true,
    clearClipboardOnBackground = false,
    enforceAppEncryption = false,
    allowEmailAddressLinks = true,
    allowScreenRecording = true,
} = DEFAULT_MDM_SETTINGS) => ({
    mdmSettings: {
        appPinCodeTouchEnabled,
        allowLoginFromUncontrolledDevices,
        allowLoginFromUncontrolledDevicesAndroid,
        allowOpenDocuments,
        allowGenerateReports,
        clearClipboardOnBackground,
        enforceAppEncryption,
        allowEmailAddressLinks,
        allowScreenRecording,
    },
});
