import * as dayjs from 'dayjs';

export const formatDate = (date) => {
  return date ? dayjs(date).format('DD/MM/YYYY') : 'Active';
};
