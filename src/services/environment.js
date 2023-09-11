import { ENV } from 'config/settings';
import theme from 'src/services/theme';

const DEFAULT_ENV_NAME = ENV.QA;
const CURRENT_THEME_NAME = theme.name;
const providedEnvName = getProvidedEnvName();

let envConfig = null;

function cookConfigPath(themeName, envName) {
    return `../../variables/${themeName.toLowerCase()}/${envName.toLowerCase()}/config.js`;
}

function getConfigFile(themeName, envName) {
    const path = cookConfigPath(themeName, envName);
    return require(path).default;
}

function getConfig(themeName = CURRENT_THEME_NAME, envName = providedEnvName) {
    if (!envConfig) {
        envConfig = getConfigFile(themeName, envName);
    }
    return envConfig;
}

function getProvidedEnvName() {
    const currentEnvName = process.env.ENV;
    if (!Object.keys(ENV).includes(currentEnvName)) {
        return DEFAULT_ENV_NAME;
    }
    return currentEnvName;
}

// DEVNOTE: used for allure reports readability, e.g '[OP QA2] - Some test description'
const toString = `[${CURRENT_THEME_NAME} ${providedEnvName}]`;

const env = {
    name: providedEnvName,
    default: getConfig(),
    getConfigFile,
    isQA: providedEnvName === ENV.QA,
    isQA2: providedEnvName === ENV.QA2,
    toString,
};

export default env;
