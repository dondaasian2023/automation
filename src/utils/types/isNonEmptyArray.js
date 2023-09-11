export default function isNonEmptyArray(array) {
    if (Array.isArray(array)) {
        return array.length !== 0;
    }
}
