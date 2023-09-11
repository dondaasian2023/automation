import { FORMATS } from 'src/app/mobile/content/modules/EntryFormEditor/constants/dateTimeFormats';

export function getDateTimeFormatByCode(code) {
    return FORMATS.find(dateTimeFormat => dateTimeFormat.CODE === code).FORMAT;
}

export function getDateTimeCodeByFormat(format) {
    return FORMATS.find(dateTimeFormat => dateTimeFormat.FORMAT === format).CODE;
}
