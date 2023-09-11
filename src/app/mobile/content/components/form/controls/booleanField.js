import ATTRIBUTES from 'src/element/constants/attributes';
import { logger } from 'src/utils/logger';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';
import Switch from 'src/app/mobile/content/components/switch';

const VALUES = {
    YES: 'Yes',
    NO: 'No',
};

const STATES = {
    YES: { ATTRIBUTE: driver.isIOS ? '1' : 'true' },
    NO: { ATTRIBUTE: driver.isIOS ? '0' : 'false' },
};

const stringifyValue = value => value.toString().toUpperCase();

const getPlatformValue = value => {
    const upperValue = stringifyValue(value);
    return STATES[upperValue].ATTRIBUTE;
};

export default function BooleanField(label) {
    const booleanField = Switch(label);

    async function getValue() {
        await swipeToElement(DIRECTIONS.UP, booleanField, { xPoint: 1 });
        return booleanField.getElementAttribute(
            driver.isIOS ? ATTRIBUTES.VALUE : ATTRIBUTES.CHECKED
        );
    }

    const getRenderedValue = async () => {
        const attributeCurrentValue = await getValue();
        const values = {
            [driver.isIOS ? '1' : 'true']: VALUES.YES,
            [driver.isIOS ? '0' : 'false']: VALUES.YES,
        };

        return values[attributeCurrentValue];
    };

    async function setValue(value) {
        await swipeToElement(DIRECTIONS.UP, booleanField, { xPoint: 1 });

        const parsedValue = getPlatformValue(value);
        const currentValue = await getValue();

        if (parsedValue === currentValue) {
            logger.warn(`Value '${value}' is already selected`);
            return;
        }

        await booleanField.clickElement();
    }

    return {
        setValue,
        getValue,
        getPlatformValue,
        getCurrentValue: getRenderedValue,
        label,
    };
}

export { VALUES };
