import { Base64 } from 'js-base64';
import HEADERS from 'src/api/constants/headers';

const AFT_KEYS = {
    AFT_HEADER_NAME: 'x-aft',
    AFTC_HEADER_NAME: 'x-aftc',
};

let aftToken;

export function processAFTHeaders(response) {
    const aft = response.headers[AFT_KEYS.AFT_HEADER_NAME];
    const aftc = response.headers[AFT_KEYS.AFTC_HEADER_NAME];
    if (aft && aftc) {
        aftToken = Base64.encode(`${aftc}:${aft}`);
    }
}

export function applyAftToken(request) {
    if (!aftToken) return;
    request.set(HEADERS.AFT_TOKEN, aftToken);
}
