import TextField, {
    EmailField,
    NumberField,
    PhoneField,
    UrlField,
} from 'src/app/mobile/content/components/form/controls/textField';
import DateTimeField from 'src/app/mobile/content/components/form/controls/dateTimeField';
import ReferenceField from 'src/app/mobile/content/components/form/controls/referenceField';
import BooleanField from 'src/app/mobile/content/components/form/controls/booleanField';
import MultiLineTextField from 'src/app/mobile/content/components/form/controls/multiLineTextField';
import EntryFormCurrencyField from 'src/app/mobile/content/features/entryForm/components/fields/entryFormCurrencyField';
import { FIELD_FORMAT_TYPES, FIELD_TYPES, TEXT_FORMAT_TYPES } from 'src/constants/shared';

// DEVNOTE: use formatTypeId
export const TEXT_FIELDS_CONTROLS_MAP = {
    [TEXT_FORMAT_TYPES.SingleLine]: TextField,
    [TEXT_FORMAT_TYPES.Email]: EmailField,
    [TEXT_FORMAT_TYPES.PhoneNumber]: PhoneField,
    [TEXT_FORMAT_TYPES.URL]: UrlField,
    [TEXT_FORMAT_TYPES.MultiLine]: MultiLineTextField,
};

// TODO: implement independent fields. For now NumberField field is fine here as it
//       works in similar way with the others
// DEVNOTE: use formatSubTypeId
export const NUMBER_FIELDS_CONTROLS_MAP = {
    [FIELD_FORMAT_TYPES.Multiple]: NumberField,
    [FIELD_FORMAT_TYPES.FileSize]: NumberField,
    [FIELD_FORMAT_TYPES.CURRENCY]: EntryFormCurrencyField,
    [FIELD_FORMAT_TYPES.NUMBER]: NumberField,
    [FIELD_FORMAT_TYPES.PERCENTAGE]: NumberField,
};

// DEVNOTE: use fieldType
export const ENTRY_FORM_FIELDS_CONTROLS_MAP = {
    [FIELD_TYPES.BOOLEAN]: BooleanField,
    [FIELD_TYPES.CHOICE]: ReferenceField,
    [FIELD_TYPES.CURRENCY]: ReferenceField,
    [FIELD_TYPES.DATE]: DateTimeField,
    [FIELD_TYPES.REFERENCE]: ReferenceField,
    [FIELD_TYPES.USER]: ReferenceField,
};
