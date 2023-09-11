import { logger } from 'src/utils/logger';
import {setSnapshotMaxDepth, takeScreenshot} from 'src/services/driver/driverActions';
import { LOG_START, logStatus, logTitle } from 'config/constants/logFormat';
import TEST_STATUS from 'config/constants/testStatus';
import addEnvironment from 'config/allure/addEnvironment';
import milliseconds from 'src/utils/milliseconds';
import { SNAPSHOT_DEPTH_MAX_VALUE_62, SPEC_MODULES } from 'config/settings';
import { cookSpecs, cookSuites } from 'config/wdio/cookSuites';
import { cookServices } from 'config/wdio/services';
import { cookReporters } from 'config/wdio/reporters';
import { setAcceptAlertButtonSelector } from 'src/services/driver/acceptAlertSettings';

export let config = {
    runner: 'local',
    port: 4723,
    path: '/',
    logLevel: 'error',
    waitforTimeout: milliseconds.seconds(20),
    connectionRetryTimeout: milliseconds.minutes(3),
    connectionRetryCount: 1,
    bail: 0,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: milliseconds.minutes(10),
    },
    ...cookSpecs(),
    ...cookSuites(SPEC_MODULES),
    ...cookServices(),
    ...cookReporters(),

    before: async function () {
        await setAcceptAlertButtonSelector();
    },

    beforeTest: async function (test) {
        await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_62);

        addEnvironment();
        logger.info(LOG_START);
        logger.info(logTitle(test.parent));
        logger.info(logTitle(test.title));
    },

    afterTest: async function (test, context, { passed }) {
        if (passed) {
            logger.info(logStatus(TEST_STATUS.PASSED));
        } else {
            logger.error(logStatus(TEST_STATUS.FAILED));
            await takeScreenshot();
        }
    },
};
