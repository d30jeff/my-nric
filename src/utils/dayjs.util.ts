import Dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

Dayjs.extend(customParseFormat);
export const dayjs = Dayjs;
