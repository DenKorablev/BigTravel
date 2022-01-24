import dayjs from 'dayjs';

const getDateDifference = (dueFrom, dueTo) => {
  const diff = dayjs(dueTo).diff(dayjs(dueFrom),'day',true);
  const days = Math.floor(diff);
  const hours = Math.floor((diff - days) * 24);
  const minutes = Math.floor(((diff - days) * 24 - hours) * 60);

  const daysText = days ? `${days}D` : '';
  const hoursText = hours || days ? `${hours}H` : '';
  return `${daysText} ${hoursText} ${minutes}M`;
};

const dateConverter = (date, formate) => dayjs(date).format(formate);

const isDateExpired = (date) => dayjs().isAfter(date, 'm');
const isDateInFuture = (date) => dayjs().isBefore(date, 'm');
const isDateCurrent = (date) => dayjs().isSame(date, 'm');

const isEventContinues = (dateFrom, dateTo) => isDateExpired(dateFrom) && isDateInFuture(dateTo);

export {
  getDateDifference,
  dateConverter,
  isDateExpired,
  isDateCurrent,
  isEventContinues,
  isDateInFuture
};
