const DATE_FORMAT = {
  MD: 'MMM D',
  ISO: 'YYYY-MM-DDTHH-mm',
  TIME: 'hh:mm',
  DMY_HM: 'DD/MM/YY hh:mm',
  FLATPICKER_DATE: 'd/m/y H:i',
};

const SORT_TYPE = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITES = ['Amsterdam', 'Geneva', 'Chamonix', 'Moscow', 'New-York'];

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export { TYPES, CITES, DATE_FORMAT, SORT_TYPE, UserAction, UpdateType, FilterType };
