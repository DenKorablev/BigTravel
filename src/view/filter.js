import AbstractView from './abstract.js';

const createFilterTemplate = (filters, currentFilterType) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map(({type, name, count}) => `
      <div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${type === currentFilterType ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name} ${count !== 0 ? count : ''}</label>
      </div>
    `).join(' ')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
