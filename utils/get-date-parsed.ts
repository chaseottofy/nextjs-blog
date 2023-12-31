import { monthNames } from '@/data/date-constants'

type DateFormat = 'MM.dd.yy' | 'LLLL d, yyyy';

const getDateParsed = (dateString: string, formatType: DateFormat) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const shortYear = year.toString().slice(-2);

  switch (formatType) {
    case 'MM.dd.yy':
      return `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}.${shortYear}`;
    case 'LLLL d, yyyy':
      return `${monthNames[date.getMonth()]} ${day}, ${year}`;
    default:
      throw new Error(`Unsupported date format: ${formatType}`);
  }
};

export default getDateParsed;
