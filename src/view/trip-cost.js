import AbstractView from './abstract.js';

const createTripCostTemplate = (points) => {
  let total = points.reduce((acc, rcc) => acc + rcc.price, 0);
  points.forEach((travel) => {
    if (travel.offers.length) {
      total += travel.offers.reduce((acc, rcc) => acc + rcc.price, 0);
    }
  });

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  `;
};

export default class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
