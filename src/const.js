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

const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITES = ['Amsterdam', 'Geneva', 'Chamonix', 'Moscow', 'New-York'];

export { TYPES, CITES, DATE_FORMAT, SORT_TYPE };
