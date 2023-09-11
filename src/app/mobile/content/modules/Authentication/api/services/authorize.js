import tenantAuthenticationClientClient from 'src/app/mobile/content/modules/Authentication/api/clients/tenantAuthenticationClientClient';
import restClient from 'src/api/clients/restClient';
import getStatus from 'src/api/services/status/getStatus';
import authenticationClient from 'src/app/mobile/content/modules/Authentication/api/clients/authenticationClient';

export default async function authorize(envUrl, user) {
    const authClient = authenticationClient(envUrl);
    const requestVerification = await authClient.getRequestVerificationToken();
    const { url, samlToken } = await authClient.getSAMLToken(user, requestVerification);
    const cookies = await tenantAuthenticationClientClient(
        url
    ).getCookiesFromAssertionConsumerService(samlToken);
    const apiClient = restClient({ cookies, url });
    await getStatus(apiClient);
    return apiClient;
}
