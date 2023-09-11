import { APP_NAME } from 'src/tests/api/universalLinks/config/universalLinksConfig';

const FILE_PATH = '/.well-known/assetlinks.json';
const RELATION = ['delegate_permission/common.handle_all_urls'];
const NAME_SPACE = 'android_app';

const SHA_256 = {
    [APP_NAME.INTAPP_CRM]: [
        '86:F8:3A:F8:52:A5:C6:AC:43:A8:18:97:6B:08:31:9E:CD:BE:92:2B:B1:90:F1:B0:75:10:B9:3E:F9:DB:94:0A',
        'F2:42:87:59:9F:F6:55:F5:C6:CD:3B:6F:19:31:70:96:13:D6:7A:39:9C:12:6F:3A:50:9A:A0:5E:F2:49:30:B7',
    ],

    [APP_NAME.DEALCLOUD]: [
        '5A:4C:EE:A6:DB:83:FB:3E:E0:51:79:84:70:99:0A:76:09:9A:89:E3:17:99:3F:48:8A:D1:66:83:5C:22:45:3A',
        '7B:DF:5D:5A:5A:18:A6:27:32:89:19:7E:28:B2:34:35:BB:70:D1:BB:9F:2E:F8:1E:06:47:B8:BC:50:BF:49:65',
    ],
};

const cookConfig = appName => {
    const packageName = `com.${appName}mobileapp`;
    const sha256 = SHA_256[appName];

    return sha256.map(key => ({
        relation: RELATION,
        target: {
            namespace: NAME_SPACE,
            package_name: packageName,
            sha256_cert_fingerprints: [key],
        },
    }));
};

export const androidULConfig = {
    FILE_PATH,
    cookConfig,
};
