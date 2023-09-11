import { format } from 'date-fns';
import { getDateTimeFormatByCode } from 'src/utils/formatters/resolveDate';

export default function formatDate(value, formatTypeId) {
    return format(value, getDateTimeFormatByCode(formatTypeId));
}
