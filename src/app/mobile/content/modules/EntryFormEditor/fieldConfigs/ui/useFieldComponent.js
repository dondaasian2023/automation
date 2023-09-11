import { FIELD_TYPES } from 'src/constants/shared';
import {
    ENTRY_FORM_FIELDS_CONTROLS_MAP,
    NUMBER_FIELDS_CONTROLS_MAP,
    TEXT_FIELDS_CONTROLS_MAP,
} from 'src/app/mobile/content/features/entryForm/fieldsControlMap';
import TextField from 'src/app/mobile/content/components/form/controls/textField';
import { logger } from 'src/utils/logger';

export function useFieldComponent({ fieldType, formatTypeId, formatSubTypeId }) {
    switch (fieldType) {
        case FIELD_TYPES.TEXT:
            return TEXT_FIELDS_CONTROLS_MAP[formatTypeId];
        case FIELD_TYPES.NUMBER:
            return NUMBER_FIELDS_CONTROLS_MAP[formatSubTypeId];
        case FIELD_TYPES.DATE:
        case FIELD_TYPES.BOOLEAN:
        case FIELD_TYPES.CURRENCY:
        case FIELD_TYPES.CHOICE:
        case FIELD_TYPES.REFERENCE:
        case FIELD_TYPES.USER:
            return ENTRY_FORM_FIELDS_CONTROLS_MAP[fieldType];
        default:
            logger.warn(`Could not find control ${{ fieldType, formatTypeId, formatSubTypeId }}`);
            return TextField;
    }
}
