import milliseconds from 'src/utils/milliseconds';

export const DEFAULT_WAIT_TIMEOUT = milliseconds.seconds(20);
export const SNAPSHOT_DEPTH_MAX_VALUE_62 = 62;
export const SNAPSHOT_DEPTH_MAX_VALUE_100 = 100;

export const APP_THEME = {
    DC: 'DC',
    OP: 'OP',
};

export const ENV = {
    QA: 'QA',
    QA2: 'QA2',
};

export const PLATFORM_NAMES = {
    ANDROID: 'Android',
    IOS: 'iOS',
};

export const BROWSERS = {
    CHROME: 'Chrome',
};

export const MODULES_PATH = 'src/app/mobile/content/modules';

export const SPEC_MODULES = [
    'Authentication',
    'EntryFormEditor',
    'Favorites',
    'Meetings',
    'More',
    'Onboarding',
    'Search',
    'Dashboards',
];
