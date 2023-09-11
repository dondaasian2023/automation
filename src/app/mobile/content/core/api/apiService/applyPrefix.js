import isObject from 'src/utils/types/isObject';
import isString from 'src/utils/types/isString';
import pathJoin from 'src/utils/pathJoin';

/**
 * DEVNOTE: object mutation is used here to keep intelliSense working properly
 * @param {string} prefix
 * @param {object|string} item
 */
export default function applyPrefix(prefix, item) {
    Object.entries(item).map(([key, value]) => {
        if (isObject(value)) {
            applyPrefix(prefix, value);
        } else if (isString(value)) {
            item[key] = pathJoin(prefix, value);
        }
    });
}
