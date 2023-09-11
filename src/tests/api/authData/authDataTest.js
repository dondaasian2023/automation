import { expect } from 'chai';
import env from 'src/services/environment';
import authorize from 'src/app/mobile/content/modules/Authentication/api/services/authorize';
import getAuthData from 'src/app/mobile/content/modules/Authentication/api/services/getAuthData';
import { APP_THEME, ENV } from 'config/settings';

const DATA_MODEL_PROPERTIES = {
    DATA: 'data',
};

const getAllConfigs = () => {
    const allConfigs = [];
    for (let [, theme] of Object.entries(APP_THEME)) {
        for (let [, environment] of Object.entries(ENV)) {
            const config = env.getConfigFile(theme, environment);
            allConfigs.push(config);
        }
    }
    return allConfigs;
};

const allConfigs = getAllConfigs();

describe('GET request to mobile/auth-data', async () => {
    allConfigs.forEach(({ ENV_URL, USERS: [USER] }) => {
        it(`When ${ENV_URL} should has non-empty "data" field in response body`, async () => {
            const authDataModel = await authorize(ENV_URL, USER).then(getAuthData);

            expect(authDataModel.hasOwnProperty(DATA_MODEL_PROPERTIES.DATA)).to.be.true;
            expect(authDataModel.data).not.to.be.empty;
        });
    });
});
