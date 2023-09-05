import { format, parseISO } from 'date-fns';

const getDateParsed = (date: string, outputFormat: string) => {
  return format(parseISO(date), outputFormat);
};

export default getDateParsed;
