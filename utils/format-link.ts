const formatLink = (str: string): string => {
  return `#${str.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().replace(/\s+/g, '-')}`;
};

export default formatLink;
