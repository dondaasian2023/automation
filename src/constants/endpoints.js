import env from 'src/services/environment';
import COMPATIBILITY_CONSTANTS from 'src/app/mobile/content/modules/Authentication/api/compatibilityConstants';

const { ENV_URL } = env.default;

export const API_PREFIX = 'api/';
export const COMPATIBILITY_API = COMPATIBILITY_CONSTANTS.GREEN;
export const MOBILE_API_PREFIX = `${API_PREFIX}${COMPATIBILITY_API}/mobile/`;

export const SAML_URL_PATH = 'Saml/AssertionConsumerService';

export const APPID_PROVIDER_SCHEME = 'mn';
export const APPID_PROVIDER_PATH_SCHEME = `/${APPID_PROVIDER_SCHEME}/`;
export const LOGIN_START_URL_PATH = `${APPID_PROVIDER_PATH_SCHEME}Account/Login`;
export const LOGIN_PORTAL_START_URL_PATH = `${ENV_URL}${APPID_PROVIDER_SCHEME}/Account/Login`;
export const FORGOT_PASSWORD_PAGE_PATH_PART = 'Account/ForgotPassword';
