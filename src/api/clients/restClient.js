import request from 'supertest';
import extractCookies from 'src/api/services/cookies/extractCookies';
import CONTENT_TYPES from 'src/api/constants/contentTypes';
import {
    applyAftToken,
    processAFTHeaders,
} from 'src/app/mobile/content/modules/Authentication/api/services/applyAftToken';
import setAuthCookies from 'src/app/mobile/content/modules/Authentication/api/services/setAuthCookies';
import { logger } from 'src/utils/logger';

const { FORM } = CONTENT_TYPES;

export default function restClient({ url, cookies }) {
    function postRequest(path, payload, { type } = {}) {
        let req = request(url).post(path);
        logRequest(req, payload);

        if (type === FORM) {
            req = req.type(FORM);
        }

        setAuthCookies(req, cookies);
        applyAftToken(req);
        return req.send(payload);
    }

    function getRequest(path, { addCookiesAsArray = false } = {}) {
        const req = request(url).get(path);
        logRequest(req);
        setAuthCookies(req, cookies, addCookiesAsArray);
        req.expect(processAFTHeaders);
        return req;
    }

    return {
        postRequest,
        getRequest,
        extractCookies: response => extractCookies(response.headers),
    };
}

function logRequest(request, payload) {
    logger.debug(`${request.method} request to ${request.url}`);
    if (payload) {
        logger.debug(`body: ${JSON.stringify(payload, null, 2)}`);
    }
}
