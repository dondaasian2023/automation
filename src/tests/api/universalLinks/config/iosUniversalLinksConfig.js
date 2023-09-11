import { APP_NAME } from 'src/tests/api/universalLinks/config/universalLinksConfig';

const FILE_PATH = '/.well-known/apple-app-site-association';

const getSupportedPaths = appName => [
    appName === APP_NAME.DEALCLOUD ? '/portal/*' : '/home/*',
    '/email/*',
    '/viewLibraryManagement/*',
    '/api/*',
    '//dcstatic/*',
    '/login/*',
];

const cookDetails = appName => {
    const paths = getSupportedPaths(appName);
    if (appName === APP_NAME.INTAPP_CRM) {
        paths.push('/portal/*');
    }

    return {
        details: [
            {
                appID: `HDAHLV6E8W.com.${appName}mobileapp`,
                paths,
            },
            {
                appID: `HDAHLV6E8W.com.${appName}mobileapp.dev`,
                paths,
            },
        ],
    };
};

const cookConfig = appName => ({
    applinks: {
        apps: [],
        ...cookDetails(appName),
    },
});

export const iosULConfig = {
    FILE_PATH,
    cookConfig,
};
