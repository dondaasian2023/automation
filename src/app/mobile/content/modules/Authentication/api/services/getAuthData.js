import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { hasStatusCode } from 'src/api/services/responseService';

export default function getAuthData(client) {
    return client
        .getRequest('mobile/auth-data', {
            addCookiesAsArray: true,
        })
        .then(res => hasStatusCode(res, HTTP_STATUS_CODES.OK))
        .then(extractAuthDataObjectFromHTML);
}

function extractAuthDataObjectFromHTML(response) {
    const responseBody = response.text;
    const modelStart = responseBody.indexOf('var model = ');
    const jsonStart = responseBody.indexOf('{', modelStart);
    const jsonEnd = responseBody.indexOf('};') + 1;
    const modelObj = JSON.parse(responseBody.substring(jsonStart, jsonEnd));

    return JSON.parse(modelObj?.AuthData);
}
