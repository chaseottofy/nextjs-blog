/*
Write a typescript function that will thoroughly test whether an ISO Date string is valid or not and return a boolean value. This function should not use any third party libraries.

Write extensive unit tests for this function.


const isDateValid = (date: Date): boolean => {
  const parsedDateValue = new Date(date).valueOf();
  return parsedDateValue > 0 && !Number.isNaN(parsedDateValue) && parsedDateValue < Infinity && parsedDateValue instanceof Date;
}

const isDateValid2 = (date: Date): boolean => {
  if (date instance)
}
*/

const getDateArray = (date: Date): number[] => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return [day, month, year];
};

export default getDateArray;
