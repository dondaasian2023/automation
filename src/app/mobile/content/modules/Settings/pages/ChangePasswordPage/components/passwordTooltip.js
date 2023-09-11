import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import ATTRIBUTES from 'src/element/constants/attributes';

const SELECTOR = 'settings_change-password-page_radio-{label}';

const STATES = {
    IOS: {
        CHECKED: 'checked',
        NOT_CHECKED: 'not checked',
    },
    ANDROID: {
        TRUE: true,
        FALSE: false,
    },
};

export default function passwordTooltip(label) {
    function init() {
        const testID = cookTestID(SELECTOR, { label });
        return element(testID);
    }

    async function getValue() {
        const checkbox = init();
        const attributeName = driver.isIOS ? ATTRIBUTES.VALUE : ATTRIBUTES.CHECKED;
        return checkbox.getElementAttribute(attributeName);
    }

    return {
        getValue,
    };
}

export { STATES };
