import { createElement } from '../util.js';

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

export default class TripCost {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
