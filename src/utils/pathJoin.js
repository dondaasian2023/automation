export default function pathJoin(...parts) {
    parts = parts.flat();
    let result = parts.map(stripSlash).join('/');

    const firstPart = parts[0] || '';
    const lastPart = parts.slice(-1)[0] || '';

    if (firstPart.startsWith('/')) {
        result = '/' + result;
    }
    if (lastPart.endsWith('/')) {
        result = result + '/';
    }

    return result;
}

export function stripSlash(part) {
    let tempPart = part;
    if (tempPart.startsWith('/')) {
        tempPart = tempPart.slice(1);
    }
    if (tempPart.endsWith('/')) {
        tempPart = tempPart.slice(0, -1);
    }
    return tempPart;
}
