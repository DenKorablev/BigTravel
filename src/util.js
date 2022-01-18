import dayjs from 'dayjs';

const getRandomInt = (min = 0, max = 1) => {
  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => array[getRandomInt(1, array.length - 1)];

const makeRandomArrayGenerator = (array) => {
  const result = [];
  const count = getRandomInt(1, array.length);

  for(let i = 0; i < count; i++) {
    result.push(array[getRandomInt(0, array.length - 1)]);
    array = array.filter((obj) => !result.includes(obj));
  }

  return result.sort();
};

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

export { getRandomInt, getRandomArrayElement, makeRandomArrayGenerator, getDateDifference, dateConverter, isDateExpired, isDateCurrent, isEventContinues, isDateInFuture };
