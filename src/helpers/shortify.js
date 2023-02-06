export const shortify = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength + 1)}...`;
};
