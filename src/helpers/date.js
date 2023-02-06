import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTimePlugin);

export const formatDate = (date) => {
  const time = typeof date === 'string' ? +date : date;
  return time ? dayjs(time).format('DD/MM/YYYY') : 'Active';
};

export const fromNow = (date) => {
  const time = typeof date === 'string' ? +date : date;
  return dayjs(time).fromNow();
};
