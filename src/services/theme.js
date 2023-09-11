import { APP_THEME } from 'config/settings';

const DEFAULT_THEME = APP_THEME.DC;

const themeName = getProvidedThemeName();

const theme = {
    name: themeName,
    select,
    isOP: themeName === APP_THEME.OP,
    isDC: themeName === APP_THEME.DC,
};

function getProvidedThemeName() {
    const currentTheme = process.env.PMA_THEME;
    if (!Object.keys(APP_THEME).includes(currentTheme)) {
        return DEFAULT_THEME;
    }
    return currentTheme;
}

function select({ op, dc, default: defaultValue }) {
    switch (theme.name) {
        case APP_THEME.OP:
            return op ?? defaultValue;
        default:
            return dc ?? defaultValue;
    }
}

export default theme;
