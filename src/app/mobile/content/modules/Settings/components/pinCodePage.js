import commonPage from 'src/app/mobile/content/components/commonPage';
import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import { sleep } from 'src/services/driver/driverActions';
import { addStep } from 'src/services/reporting/allure';

const SELECTORS = {
    CANCEL_BUTTON_BELOW: '~authentication_pin-code_number-keyboard_btn-cancel',
    TITLE: 'authentication_pin-code_title-{title}',
    NUM: 'authentication_pin-code_number-keyboard_num-{value}',
};

export const PIN_PAGE_TITLE = {
    REPEAT_PIN: 'Repeat PIN',
    SET_PIN: 'Set PIN',
};

function pinCodePage(pageTitle) {
    const pageID = findPageTitle(pageTitle);
    return {
        ...commonPage(pageID, pageTitle),
        tapCancel,
        enterPinCode,
    };

    function findPageTitle(title) {
        if (!Object.values(PIN_PAGE_TITLE).includes(title)) {
            throw Error(`Provided page title ${title} is not supported by "type" method`);
        }
        return cookTestID(SELECTORS.TITLE, { title });
    }

    async function tapCancel() {
        await element(SELECTORS.CANCEL_BUTTON_BELOW).clickElement();
    }

    async function tapPin(value) {
        const testId = cookTestID(SELECTORS.NUM, { value: value.toString() });
        await element(testId).clickElement();
    }

    async function enterPinCode(nums) {
        addStep(`Enter pin: ${nums}`);
        for (const num of nums) {
            await tapPin(num);
            await sleep(200);
        }
    }
}

const RepeatPinPage = pinCodePage(PIN_PAGE_TITLE.REPEAT_PIN);
const SetPinPage = pinCodePage(PIN_PAGE_TITLE.SET_PIN);

export { RepeatPinPage, SetPinPage };
