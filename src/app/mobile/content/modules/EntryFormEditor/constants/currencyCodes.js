import environment from 'src/services/environment';
import theme from 'src/services/theme';

export const CURRENCIES_CODES = {
    CAD: 'CAD',
    CHF: 'CHF',
    CNY: 'CNY',
    EUR: 'EUR',
    GBP: 'GBP',
    JPY: 'JPY',
    USD: 'USD',
    ARS: 'ARS',
    MMK: 'MMK',
    RSD: 'RSD',
    AUD: 'AUD',
    BRL: 'BRL',
    HKD: 'HKD',
    ILS: 'ILS',
    INR: 'INR',
    KRW: 'KRW',
    SEK: 'SEK',
    RUB: 'RUB',
    MVR: 'MVR',
};

//TODO randomArrayElement and parsed value for different currency
const CURRENCY_CODES_DC = [
    CURRENCIES_CODES.CAD,
    CURRENCIES_CODES.CHF,
    CURRENCIES_CODES.CNY,
    CURRENCIES_CODES.EUR,
    CURRENCIES_CODES.GBP,
    CURRENCIES_CODES.JPY,
    CURRENCIES_CODES.USD,
];

const CURRENCY_CODES_OP_QA = [
    CURRENCIES_CODES.CAD,
    CURRENCIES_CODES.CHF,
    CURRENCIES_CODES.CNY,
    CURRENCIES_CODES.EUR,
    CURRENCIES_CODES.GBP,
    CURRENCIES_CODES.JPY,
    CURRENCIES_CODES.MVR,
    CURRENCIES_CODES.USD,
];

const CURRENCY_CODES_OP_QA2 = [
    CURRENCIES_CODES.AUD,
    CURRENCIES_CODES.BRL,
    CURRENCIES_CODES.CAD,
    CURRENCIES_CODES.CHF,
    CURRENCIES_CODES.CNY,
    CURRENCIES_CODES.EUR,
    CURRENCIES_CODES.GBP,
    CURRENCIES_CODES.HKD,
    CURRENCIES_CODES.ILS,
    CURRENCIES_CODES.INR,
    CURRENCIES_CODES.JPY,
    CURRENCIES_CODES.KRW,
    CURRENCIES_CODES.RUB,
    CURRENCIES_CODES.SEK,
    CURRENCIES_CODES.USD,
];

const CURRENCY_CODES = () => (theme.isDC ? getCurrencyCodesDC() : getCurrencyCodesOP());

function getCurrencyCodesDC() {
    return CURRENCY_CODES_DC;
}
function getCurrencyCodesOP() {
    return environment.isQA ? CURRENCY_CODES_OP_QA : CURRENCY_CODES_OP_QA2;
}

export default CURRENCY_CODES;
