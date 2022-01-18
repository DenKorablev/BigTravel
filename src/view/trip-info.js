import { dateConverter } from '../util.js';
import { DATE_FORMAT } from '../const.js';

const getTravelRoute = (points) => {
  const cityList = new Set(points.map(({destination}) => destination.name));
  const longCityList = `${Array.from(cityList).shift()} &mdash; ... &mdash; ${Array.from(cityList).pop()}`;
  return cityList.size <= 3 ? Array.from(cityList).join(' &mdash; ') : longCityList;
};

const getTravelPeriod = (points) => {
  const start = points.map(({dueFrom}) => dueFrom).sort((a, b) => a.dueFrom - b.dueFrom).shift();
  const end = points.map(({dueTo}) => dueTo).sort((a, b) => a.dueTo - b.dueTo).pop();
  return `${dateConverter(start, DATE_FORMAT.MD)} &mdash; ${dateConverter(end, DATE_FORMAT.MD)}`;
};

export const createTripInfoTemplate = (points) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTravelRoute(points)}</h1>

      <p class="trip-info__dates">${getTravelPeriod(points)}</p>
    </div>
  </section>`;
