import { FIELD_FORMAT_TYPES, FIELD_TYPES, TEXT_FORMAT_TYPES } from 'src/constants/shared';
import {
    email,
    paragraph,
    phoneNumber,
    randomArrayElement,
    randomNumber,
    sentence,
    url,
} from 'src/services/fakeDataGenerator';
import CURRENCY_CODES, {
    CURRENCIES_CODES,
} from 'src/app/mobile/content/modules/EntryFormEditor/constants/currencyCodes';
import formatBytes from 'src/utils/formatters/formatBytes';
import numberWithCommas from 'src/utils/formatters/numberWithCommas';
import { VALUES } from 'src/app/mobile/content/components/form/controls/booleanField';
import userService from 'src/services/userService';
import formatDate from 'src/utils/formatters/formatDate';

// DEVNOTE: Used to generate random data for creating an entry from ui based on the fields of an existing list
export const useRandomFieldValue = field => {
    const { fieldType, defaultValue, formatSubTypeId, choiceFieldOptions, formatTypeId } = field;

    let value = '';
    let displayedValue = '';
    switch (fieldType) {
        case FIELD_TYPES.NUMBER:
            ({ value, displayedValue } = numberFieldValue(formatSubTypeId));
            break;
        case FIELD_TYPES.TEXT:
            ({ value, displayedValue } = textFieldValue(formatTypeId));
            break;
        case FIELD_TYPES.CURRENCY:
            value = randomArrayElement(CURRENCY_CODES());
            break;
        case FIELD_TYPES.CHOICE:
            value = randomArrayElement(choiceFieldOptions).name.toString();
            break;
        case FIELD_TYPES.BOOLEAN:
            value = defaultValue ? VALUES.NO : VALUES.YES;
            break;
        case FIELD_TYPES.USER:
            value = userService.getCurrentUserFullName();
            break;
        case FIELD_TYPES.DATE:
            value = new Date();
            displayedValue = formatDate(value, formatTypeId);
            break;
    }

    return {
        ...field,
        value,
        displayedValue: displayedValue || value,
    };
};

const numberFieldValue = formatSubTypeId => {
    let value = randomNumber();
    let displayedValue = value;
    switch (formatSubTypeId) {
        case FIELD_FORMAT_TYPES.NUMBER:
            displayedValue = numberWithCommas(value);
            break;
        case FIELD_FORMAT_TYPES.CURRENCY:
            displayedValue = `$${value}`;
            value = { value, currency: CURRENCIES_CODES.USD };
            break;
        case FIELD_FORMAT_TYPES.FileSize:
            displayedValue = formatBytes(value);
            break;
        case FIELD_FORMAT_TYPES.Multiple:
            displayedValue = `${numberWithCommas(value)}x`;
            break;
        case FIELD_FORMAT_TYPES.PERCENTAGE:
            displayedValue = `${value}%`;
            break;
    }

    return {
        value,
        displayedValue,
    };
};

const textFieldValue = textFormatType => {
    let value = '';
    switch (textFormatType) {
        case TEXT_FORMAT_TYPES.SingleLine:
            value = sentence();
            break;
        case TEXT_FORMAT_TYPES.MultiLine:
            value = paragraph();
            break;
        case TEXT_FORMAT_TYPES.RichText:
            value = '';
            break;
        case TEXT_FORMAT_TYPES.Email:
            value = email();
            break;
        case TEXT_FORMAT_TYPES.PhoneNumber:
            value = phoneNumber();
            break;
        case TEXT_FORMAT_TYPES.URL:
            value = url();
            break;
    }

    return {
        value,
        displayedValue: value,
    };
};
