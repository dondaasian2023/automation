import commonPage from 'src/app/mobile/content/components/commonPage';
import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import ATTRIBUTES from 'src/element/constants/attributes';
import { addStep } from 'src/services/reporting/allure';
import NativeAlert from 'src/app/mobile/content/components/NativeAlert';

const SELECTORS = {
    AUTH_BUTTON: 'authentication_login_auth-btn-{dataCenter}',
    DATA_CENTER: {
        CURRENT_DATA_CENTER_LABEL: '~authentication_data-center_current-data-center',
        BACK_BTN: 'authentication_data-center_back-btn',
        SELECT_BTN: '~authentication_data-center_select-btn',
    },
};

async function getCurrentDataCenter() {
    const dataCenter = element(SELECTORS.DATA_CENTER.CURRENT_DATA_CENTER_LABEL);
    return dataCenter.getElementAttribute(driver.isIOS ? ATTRIBUTES.LABEL : ATTRIBUTES.TEXT);
}

async function changeDataCenter(dataCenter) {
    addStep(`Select data center: ${dataCenter}`);
    await element(SELECTORS.DATA_CENTER.SELECT_BTN).clickElement();
    const selector = cookTestID(SELECTORS.AUTH_BUTTON, { dataCenter });
    await element(selector).clickElement();
    await NativeAlert.pressYes();
}

const LoginSettingsPage = {
    ...commonPage(SELECTORS.DATA_CENTER.CURRENT_DATA_CENTER_LABEL, 'Data Center'),
    changeDataCenter,
    getCurrentDataCenter,
};
export default LoginSettingsPage;
