import { logger } from 'src/utils/logger';

const keyToSubstring = key => `{${key}}`;
const substringToKey = substring => substring.slice(1, -1);
const extractKeySubstrings = locator => locator.match(/{[^{}]+}/g);

const validateProvidedValue = (value, locator, key) => {
    if (!value) {
        return `Key '${key}' for locator '${locator}' is empty`;
    }

    if (typeof value !== 'string') {
        return `Key '${key}' for locator '${locator}' is invalid`;
    }

    return null;
};

function stringifyText(text) {
    if (!text) return '';

    return text.toLowerCase().split(' ').join('-');
}

export function cookTestID(locator, params = {}) {
    if (!locator) return '';

    const keysSubstrings = extractKeySubstrings(locator);
    if (!keysSubstrings) {
        logger.warn(`No keys in locator '${locator}'`);
        return locator;
    }
    const keysToReplace = keysSubstrings.map(substringToKey);
    const restParams = { ...params };
    const result = keysToReplace.reduce((acc, key) => {
        const value = params[key];
        delete restParams[key];

        const valueValidationError = validateProvidedValue(value, locator, key);
        if (valueValidationError) {
            logger.warn(valueValidationError);
            return acc;
        }

        return acc.replace(keyToSubstring(key), stringifyText(value));
    }, locator);

    const unusedKeys = Object.keys(restParams);
    if (unusedKeys.length > 0) {
        logger.warn(`Redundant keys for locator ${locator}: ${unusedKeys}`);
    }
    return `~${result}`;
}

const removeIDSymbol = locator => locator.replace('~', '');

export const cookResourceId = (locator, params) =>
    `//*[@resource-id="${removeIDSymbol(cookTestID(locator, params))}"]`;

export const cookXPath = (locator, params) => removeIDSymbol(cookTestID(locator, params));
