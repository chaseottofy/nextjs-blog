const getDateArray = (date: Date): number[] => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return [day, month, year];
};

export default getDateArray;
