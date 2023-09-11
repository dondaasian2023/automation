import AUTHORIZATION_COOKIES from 'src/app/mobile/content/modules/Authentication/api/authorizationCookies';
import HEADERS from 'src/api/constants/headers';

const { DC_SESSION_ID, DC_SSO_SESSION_ID, ASP_NET, DC_WEB_SESSION_HASH } = AUTHORIZATION_COOKIES;
const { COOKIE } = HEADERS;

export default function setAuthCookies(request, cookies, isArray = false) {
    if (!cookies) return;

    if (isArray) {
        request.set(COOKIE, [
            cookies[DC_SESSION_ID],
            cookies[DC_SSO_SESSION_ID],
            cookies[ASP_NET],
            cookies[DC_WEB_SESSION_HASH],
        ]);
    } else {
        request
            .set(COOKIE, cookies[DC_SESSION_ID])
            .set(COOKIE, cookies[DC_SSO_SESSION_ID])
            .set(COOKIE, cookies[ASP_NET]);
    }
}
