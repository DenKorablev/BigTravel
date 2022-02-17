import { compareTwoDate } from './date.js';

export const ChartMode = {
  MONEY: 'money',
  TYPE: 'type',
  TIME: 'time',
};

export const makeItemsUniq = (items) => [...new Set(items)];

export const getUniqueTypes = (points) => {
  const allTypes = points.map((point) => point.type);
  return makeItemsUniq(allTypes);
};

export const getSortedData = (points, types, chartMode) => {
  const data = new Map();
  types.forEach((type) => {
    data[type] = 0;
  });

  switch (chartMode) {
    case ChartMode.MONEY:
      points.forEach((point) => {
        data[point.type] += point.price;
      });
      break;
    case ChartMode.TYPE:
      points.forEach((point) => {
        data[point.type]++;
      });
      break;
    case ChartMode.TIME:
      points.forEach((point) => {
        data[point.type] += compareTwoDate(point.dueFrom, point.dueTo);
      });
      break;
  }
  let sortedData = Object.entries(data).slice().sort((a, b) => b[1] - a[1]);
  sortedData = sortedData.reduce((result, [type, value]) => {
    result.types.push(type.toUpperCase());
    result.values.push(value);
    return result;
  }, { types: [], values: [] });
  return sortedData;
};
