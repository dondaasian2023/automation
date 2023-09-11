import { v4 as uuidv4 } from 'uuid';

export function generateUuid() {
    const options = {
        random: getRandomBytes(),
    };
    return uuidv4(options);
}

function getRandomBytes() {
    // eslint-disable-next-line no-bitwise
    return new Uint8Array(16).map(() => Math.random() * ((1 << 8) - 1));
}
