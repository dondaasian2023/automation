import restClient from 'src/api/clients/restClient';
import { getElementByQuerySelector } from 'src/services/html/domParser';
import AUTHORIZATION_COOKIES from 'src/app/mobile/content/modules/Authentication/api/authorizationCookies';
import {
    FORM_SELECTOR,
    REQUEST_VERIFICATION_TOKEN_INPUT_SELECTOR,
    SAML_SELECTOR,
} from 'src/app/mobile/content/modules/Authentication/api/responseBodySelectors';
import {
    APPID_PROVIDER_SCHEME,
    FORGOT_PASSWORD_PAGE_PATH_PART,
    LOGIN_START_URL_PATH,
    SAML_URL_PATH,
} from 'src/constants/endpoints';
import CONTENT_TYPES from 'src/api/constants/contentTypes';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import HEADERS from 'src/api/constants/headers';
import { hasStatusCode } from 'src/api/services/responseService';

const { ASP_NET, REQUEST_VERIFICATION_TOKEN } = AUTHORIZATION_COOKIES;
const { OK, FOUND } = HTTP_STATUS_CODES;
const { COOKIE } = HEADERS;

export default function authenticationClient(url) {
    const authorizationRestClient = restClient({ url });

    async function getRequestVerificationToken() {
        const result = await authorizationRestClient
            .getRequest(LOGIN_START_URL_PATH)
            .then(res => hasStatusCode(res, OK));

        const tokenFromInput = getElementByQuerySelector(
            result.text,
            REQUEST_VERIFICATION_TOKEN_INPUT_SELECTOR
        ).value;

        const cookies = authorizationRestClient.extractCookies(result);
        const tokenFromCookies = cookies[REQUEST_VERIFICATION_TOKEN];

        return {
            tokenFromInput,
            tokenFromCookies,
        };
    }

    async function getSAMLToken({ EMAIL, PASSWORD }, { tokenFromInput, tokenFromCookies }) {
        const payload = {
            Email: EMAIL,
            Password: PASSWORD,
            LoginType: APPID_PROVIDER_SCHEME,
            ForgotPassword: FORGOT_PASSWORD_PAGE_PATH_PART,
            [REQUEST_VERIFICATION_TOKEN]: tokenFromInput,
        };

        const result = await authorizationRestClient
            .postRequest(LOGIN_START_URL_PATH, payload, { type: CONTENT_TYPES.FORM })
            .set(COOKIE, [tokenFromCookies])
            .then(res => hasStatusCode(res, FOUND));

        const aspNetCookie = authorizationRestClient.extractCookies(result)[ASP_NET];

        const redirectResult = await authorizationRestClient
            .getRequest(APPID_PROVIDER_SCHEME)
            .set(COOKIE, [tokenFromCookies])
            .set(COOKIE, [aspNetCookie])
            .then(res => hasStatusCode(res, OK));

        const actionAttributeValue = getElementByQuerySelector(
            redirectResult.text,
            FORM_SELECTOR
        )?.getAttribute('action');

        return {
            samlToken: getElementByQuerySelector(redirectResult.text, SAML_SELECTOR)?.value,
            url: actionAttributeValue?.replace(SAML_URL_PATH, ''),
        };
    }

    return {
        getRequestVerificationToken,
        getSAMLToken,
    };
}
