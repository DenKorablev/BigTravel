import { createMenuTemplate } from './view/menu.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripCostTemplate } from './view/trip-cost.js';
import { createFilterTemplate } from './view/filter.js';
import { createTripBordTemplate } from './view/trip-bord.js';
import { createEditPointTemplate } from './view/edit-point.js';
import { createPointTemplate } from './view/point.js';
import { generatePointData } from './mock/data.js';

const MOKO_COUNT = 18;
const pointsData = new Array(MOKO_COUNT).fill().map(generatePointData);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const sitePageBodyElement = document.querySelector('.page-body');

const mainMenuElement = sitePageBodyElement.querySelector('.trip-controls__navigation');
render(mainMenuElement, createMenuTemplate());

const tripFiltersElement = sitePageBodyElement.querySelector('.trip-controls__filters');
render(tripFiltersElement, createFilterTemplate());

const tripBordElement = sitePageBodyElement.querySelector('.trip-events');
render(tripBordElement, createTripBordTemplate());

const tripMainElement = sitePageBodyElement.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, createTripCostTemplate());

const tripListElement = tripBordElement.querySelector('.trip-events__list');
render(tripListElement, createEditPointTemplate());

for(const point of pointsData) {
  render(tripListElement, createPointTemplate(point));
}

