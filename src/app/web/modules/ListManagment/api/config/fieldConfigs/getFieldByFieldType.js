import singleLineField from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/textFields/singleLineField';
import emailField from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/textFields/emailField';
import phoneNumberField from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/textFields/phoneNumberField';
import urlField from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/textFields/urlField';
import { logger } from 'src/utils/logger';
import { TEXT_FORMAT_TYPES } from 'src/constants/shared';

const fieldTypeMap = {
    [TEXT_FORMAT_TYPES.SingleLine]: singleLineField,
    [TEXT_FORMAT_TYPES.Email]: emailField,
    [TEXT_FORMAT_TYPES.PhoneNumber]: phoneNumberField,
    [TEXT_FORMAT_TYPES.URL]: urlField,
};

export const getTextFieldByTextFormatType = textFormatType => {
    if (!Object.keys(fieldTypeMap).includes(textFormatType.toString())) {
        logger.warn(`Unsupported field type: "${textFormatType}"`);
        return;
    }
    return fieldTypeMap[textFormatType];
};
