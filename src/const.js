const DATE_FORMAT = {
  MD: 'MMM D',
  ISO: 'YYYY-MM-DDTHH-mm',
  TIME: 'hh:mm',
  DMY_HM: 'DD/MM/YY hh:mm',
};

const SORT_TYPE = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITES = ['Amsterdam', 'Geneva', 'Chamonix', 'Moscow', 'New-York'];

export { TYPES, CITES, DATE_FORMAT, SORT_TYPE };
