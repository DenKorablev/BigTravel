import { createElement } from '../util.js';

const createFilterTemplate = (filters) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map(({name, count}) => `
      <div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" checked>
        <label class="trip-filters__filter-label" for="filter-${name}">${name} ${count === 0 ? '' : count}</label>
      </div>
    `).join(' ')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
