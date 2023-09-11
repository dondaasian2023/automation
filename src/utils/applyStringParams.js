/**
 * Apply params to string by using params key
 * Example
 * ```
 * urlWithParams('a b {c}', { c: 42 }) // => 'a b 42'
 * ```
 * @param {string} string
 * @param {object} paramsObj
 * @param configObj
 * @return {*}
 */
export default (string, paramsObj, configObj) => {
    const { quantifierLeft = '{', quantifierRight = '}' } = configObj || {};
    if (!string) return '';
    Object.entries(paramsObj).forEach(([key, value]) => {
        string = string.replace(`${quantifierLeft}${key}${quantifierRight}`, value);
    });
    return string;
};
