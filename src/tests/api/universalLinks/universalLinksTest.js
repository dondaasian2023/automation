import request from 'supertest';
import { expect } from 'chai';
import {
    cookAppUrl,
    SUPPORTED_RESOURCES,
} from 'src/tests/api/universalLinks/config/universalLinksConfig';
import { iosULConfig } from 'src/tests/api/universalLinks/config/iosUniversalLinksConfig';
import { androidULConfig } from 'src/tests/api/universalLinks/config/androidUniversalLinksConfig';
import HTTP_STATUS_CODES from 'src/api/constants/httpStatusCodes';

const testData = [iosULConfig, androidULConfig];

describe('Universal Links', function () {
    testData.forEach(config => {
        SUPPORTED_RESOURCES.forEach(({ DOMAIN, APP_NAME }) => {
            it(`GET request to ${DOMAIN}${config.FILE_PATH}`, async () => {
                const expectedConfig = config.cookConfig(APP_NAME);
                const response = await request(cookAppUrl(DOMAIN)).get(config.FILE_PATH);
                const { body: actualUniversalLinksConfig } = response;

                expect(response.statusCode).to.eql(HTTP_STATUS_CODES.OK);
                expect(actualUniversalLinksConfig).to.eql(expectedConfig);
            });
        });
    });
});
