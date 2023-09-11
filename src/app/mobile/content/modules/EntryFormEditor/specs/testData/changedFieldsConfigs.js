import fieldConfigs from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/fieldConfigs';
import { randomArrayElement } from 'src/services/fakeDataGenerator';
import CURRENCY_CODES from 'src/app/mobile/content/modules/EntryFormEditor/constants/currencyCodes';
import { SPEC_SYMBOLS } from 'src/constants/specSymbols';
import { BOOLEAN_VALUES } from 'src/app/mobile/content/modules/EntryFormEditor/constants/booleanValues';
import dateTimeField from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/dateTimeField';
import { FIELD_TYPES } from 'src/constants/shared';

const {
    singleLineField,
    multilineField,
    emailField,
    phoneNumberField,
    urlField,
    numberField,
    percentageField,
    multipleField,
    fileSizeField,
    numberCurrencyField,
    currencyField,
    booleanField,
    userField,
    choiceField,
} = fieldConfigs;

const choiceFieldOptions = [1, 'Choose me', SPEC_SYMBOLS];

export const changedFieldsConfigs = [
    {
        fieldType: FIELD_TYPES.TEXT,
        fields: [singleLineField(), multilineField(), emailField(), phoneNumberField(), urlField()],
    },
    {
        fieldType: FIELD_TYPES.NUMBER,
        fields: [
            numberField(),
            percentageField(),
            multipleField(),
            fileSizeField(),
            numberCurrencyField(),
        ],
    },
    {
        fieldType: FIELD_TYPES.CURRENCY,
        fields: [currencyField({ defaultCurrencyCode: randomArrayElement(CURRENCY_CODES) })],
    },
    {
        fieldType: FIELD_TYPES.CHOICE,
        fields: [choiceField({ choiceFieldOptions })],
    },
    {
        fieldType: FIELD_TYPES.BOOLEAN,
        fields: [
            booleanField({ defaultValue: BOOLEAN_VALUES.YES }),
            booleanField({ defaultValue: BOOLEAN_VALUES.NO }),
        ],
    },
    {
        fieldType: FIELD_TYPES.USER,
        fields: [userField()],
    },
    {
        fieldType: FIELD_TYPES.DATE,
        fields: [dateTimeField()],
    },
];
