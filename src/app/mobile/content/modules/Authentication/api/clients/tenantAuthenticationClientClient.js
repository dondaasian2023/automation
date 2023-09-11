import restClient from 'src/api/clients/restClient';
import { SAML_URL_PATH } from 'src/constants/endpoints';
import CONTENT_TYPES from 'src/api/constants/contentTypes';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';
import { hasStatusCode } from 'src/api/services/responseService';

export default function tenantAuthenticationClientClient(url) {
    const client = restClient({ url });

    async function getCookiesFromAssertionConsumerService(samlToken) {
        if (!samlToken) {
            throw Error(
                'Enable to get cookies from Saml/AssertionConsumerService.\nToken is empty'
            );
        }

        const payload = {
            SAMLResponse: samlToken,
        };

        const samlResponse = await client
            .postRequest(SAML_URL_PATH, payload, { type: CONTENT_TYPES.FORM })
            .then(res => hasStatusCode(res, HTTP_STATUS_CODES.FOUND));

        return client.extractCookies(samlResponse);
    }

    return {
        getCookiesFromAssertionConsumerService,
    };
}
