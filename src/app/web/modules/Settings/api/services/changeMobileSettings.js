import { API_PREFIX } from 'src/constants/endpoints';
import qs from 'qs';
import { cookAuthenticationSettings } from 'src/app/web/modules/Settings/api/mobileSettingsConfig/cookAuthenticationSettings';

const DEFAULT_SETTINGS = cookAuthenticationSettings();

export default function changeMobileSettings(client, settings = DEFAULT_SETTINGS) {
    return client.postRequest(`${API_PREFIX}siteSettings/mobileSettings`, qs.stringify(settings));
}
