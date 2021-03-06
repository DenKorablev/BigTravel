import dayjs from 'dayjs';

const compareTwoDate = (dueFrom, dueTo) => dayjs(dueTo).diff(dayjs(dueFrom),'day',true);


const getHumanizationDate = (duration) => {
  const days = Math.floor(duration);
  const hours = Math.floor((duration - days) * 24);
  const minutes = Math.floor(((duration - days) * 24 - hours) * 60);

  const daysText = days ? `${days}D` : '';
  const hoursText = hours || days ? `${hours}H` : '';
  return `${daysText} ${hoursText} ${minutes}M`;
};

const getDateDifference = (dueFrom, dueTo) => {
  const diff = dayjs(dueTo).diff(dayjs(dueFrom),'day',true);
  return getHumanizationDate(diff);
};

const dateConverter = (date, formate) => dayjs(date).format(formate);

const isDateExpired = (date) => dayjs().isAfter(date, 'm');
const isDateInFuture = (date) => dayjs().isBefore(date, 'm');
const isDateCurrent = (date) => dayjs().isSame(date, 'm');

const isEventContinues = (dateFrom, dateTo) => isDateExpired(dateFrom) && isDateInFuture(dateTo);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByTime = (prev, curr) => {
  const datePrev = dayjs(prev.dueTo).diff(dayjs(prev.dueFrom));
  const dateCurr = dayjs(curr.dueTo).diff(dayjs(curr.dueFrom));

  const weight = getWeightForNullDate(datePrev, dateCurr);

  if (weight !== null) {
    return weight;
  }

  return  dateCurr - datePrev;
};

const sortByPrice = (prev, curr) => {
  const weight = getWeightForNullDate(prev.price, curr.price);

  if (weight !== null) {
    return weight;
  }

  return prev.price - curr.price;
};

export {
  compareTwoDate,
  getDateDifference,
  getHumanizationDate,
  dateConverter,
  isDateExpired,
  isDateCurrent,
  isEventContinues,
  isDateInFuture,
  sortByTime,
  sortByPrice
};
