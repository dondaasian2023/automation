import isString from 'src/utils/types/isString';
import isEmptyString from 'src/utils/types/isEmptyString';

/**
 * @param {string|{ios?:string, android?:string, default?:string}} selector
 * @returns {any}
 */
export const getSelectorByPlatformName = selector => {
    if (isString(selector)) {
        selector = { default: selector };
    }

    selector = (driver.isAndroid ? selector.android : selector.ios) ?? selector.default;

    if (isEmptyString(selector)) {
        throw new Error(`Unsupported selector type ${selector}.`);
    }

    return selector;
};
