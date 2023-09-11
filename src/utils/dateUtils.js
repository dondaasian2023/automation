import { format } from 'date-fns';

const DEFAULT_FORMAT_PATTERN = "yyyy-MM-dd'T'HH:mm:ss:ms";

const nowDate = (pattern = DEFAULT_FORMAT_PATTERN) => format(new Date(), pattern);

export { nowDate };
