export const createFilterTemplate = (filters) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map(({name, count}) => `
      <div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" checked>
        <label class="trip-filters__filter-label" for="filter-${name}">${name} ${count}</label>
      </div>
    `).join(' ')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
