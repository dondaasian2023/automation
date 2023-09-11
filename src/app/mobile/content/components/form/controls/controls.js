import MultiLineTextField from 'src/app/mobile/content/components/form/controls/multiLineTextField';
import SelectFieldModal from 'src/app/mobile/content/components/form/controls/common/select/selectFieldModal';
import BooleanField from 'src/app/mobile/content/components/form/controls/booleanField';
import DateTimeField from 'src/app/mobile/content/components/form/controls/dateTimeField';
import TextField, {
    EmailField,
    NumberField,
    PhoneField,
    UrlField,
} from 'src/app/mobile/content/components/form/controls/textField';
import ReferenceField from 'src/app/mobile/content/components/form/controls/referenceField';
import EntryFormCurrencyField from 'src/app/mobile/content/features/entryForm/components/fields/entryFormCurrencyField';

const CONTROLS = {
    MultiLineTextField,
    SelectFieldModal,
    BooleanField,
    DateTimeField,
    ReferenceField,
    NumberField,
    PhoneField,
    UrlField,
    EmailField,
    EntryFormCurrencyField,
    TextField,
};

export default CONTROLS;
