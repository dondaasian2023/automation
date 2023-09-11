export const PATTERNS = {
    MM_DD_YY: 'MM/dd/yy',
    yyyy: 'yyyy',
    LLLL_dd_YYYY: 'LLLL dd, yyyy',
};

export const FORMATS = [
    {
        CODE: 40,
        FORMAT: PATTERNS.MM_DD_YY,
    },
    {
        CODE: 89,
        FORMAT: PATTERNS.yyyy,
    },
    {
        CODE: 35,
        FORMAT: PATTERNS.LLLL_dd_YYYY,
    },
];
