const path = require('path');
import { MODULES_PATH } from 'config/settings';

export function cookSuites(modules) {
    const suites = modules.reduce(
        (modules, path) => ({ ...modules, [path]: cookPathToSpecFiles(path) }),
        {}
    );

    return { suites };
}

export function cookSpecs() {
    return {
       // specs: [path.resolve(__dirname, `../../${MODULES_PATH}/**/*.spec.js`)],
       specs: [path.resolve(__dirname, `../../${MODULES_PATH}/**/login.e2e.spec.js`)],
      // specs: [path.resolve(__dirname, `../../${MODULES_PATH}/**/login.customDomain.e2e.spec.js`)],
    };
}

function cookPathToSpecFiles(module) {
    return [`${MODULES_PATH}/${module}/specs/**/*.spec.js`];
}
