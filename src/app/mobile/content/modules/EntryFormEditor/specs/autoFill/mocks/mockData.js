import TextField from 'src/app/mobile/content/components/form/controls/textField';
import ReferenceField from 'src/app/mobile/content/components/form/controls/referenceField';
import DateTimeField from 'src/app/mobile/content/components/form/controls/dateTimeField';
import BooleanField, { VALUES } from 'src/app/mobile/content/components/form/controls/booleanField';

export const AUTOFILL_LIST_NAME = 'Auto-Fill';
export const REFERENCE_FIELD_LABEL = 'Ref to Autofill';

export const AUTOFILL_REF_NAMES = {
    AUTO_FILL_2: 'Auto Fill 2',
    AUTO_FILL_3: 'Auto Fill 3',
};

// TODO: Add validation of currency field
export const refToAutofill = {
    entryData: [
        {
            component: TextField('Text'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: 'MobileOp Dealcloud',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: 'Ref to Auto Text Field',
            },
        },
        {
            component: TextField('Multiple'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: '12,321x',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: { initial: '', parsed: 'N/A' },
            },
        },
        {
            component: TextField('File size'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: { initial: '5512', parsed: '5 KB' },
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: { initial: '', parsed: 'N/A' },
            },
        },
        {
            component: TextField('Number'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: '123,321',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: '123,123,123',
            },
        },
        {
            component: TextField('Percentage'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: '5123%',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: { initial: '', parsed: 'N/A' },
            },
        },
        {
            component: ReferenceField('Reference multi'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: 'Alla; Fedor; Vladimir; Suzan',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: { initial: 'Select references', parsed: 'N/A' },
            },
        },
        {
            component: ReferenceField('Reference'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: 'Georgy',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: 'Georgy',
            },
        },

        {
            component: ReferenceField('Choice'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: 'One',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: 'Four',
            },
        },

        {
            component: ReferenceField('Choice multi'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: { initial: 'Four; Three', parsed: 'Three; Four' },
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: { initial: 'Select values', parsed: 'N/A' },
            },
        },
        {
            component: DateTimeField('Date and Time'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: '05/01/22',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: '05/08/22',
            },
        },
        {
            component: BooleanField('Bool'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: {
                    initial: BooleanField('Bool').getPlatformValue(VALUES.NO),
                    parsed: VALUES.NO,
                },
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: {
                    initial: BooleanField('Bool').getPlatformValue(VALUES.YES),
                    parsed: VALUES.YES,
                },
            },
        },
        {
            component: ReferenceField('User'),
            value: {
                [AUTOFILL_REF_NAMES.AUTO_FILL_2]: 'Mikita Molchan',
                [AUTOFILL_REF_NAMES.AUTO_FILL_3]: 'Masha BotOP',
            },
        },
    ],
};
