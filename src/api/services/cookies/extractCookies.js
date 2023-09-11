import HEADERS from 'src/api/constants/headers';

const { SET_COOKIE } = HEADERS;

const extractCookies = headers => {
    const cookies = headers[SET_COOKIE];

    return cookies.reduce((shapedCookies, cookieString) => {
        const [rawCookie] = cookieString.split('; ');
        const [cookieName] = rawCookie.split('=');
        return { ...shapedCookies, [cookieName]: rawCookie };
    }, {});
};

export default extractCookies;
