import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FilterView from './view/filter.js';
import { generatePointData } from './mock/data.js';
import { generateFilter } from './mock/filters.js';
import { render, RenderPosition } from './utils/render.js';
import PointListPresenter from './presenter/point-list.js';

const MOKO_COUNT = 15;
const pointsData = new Array(MOKO_COUNT).fill().map(generatePointData).sort((a, b) => a.dueFrom - b.dueFrom);
const filters = generateFilter(pointsData);

const sitePageBodyElement = document.querySelector('.page-body');
const mainMenuElement = sitePageBodyElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = sitePageBodyElement.querySelector('.trip-controls__filters');
const tripBordElement = sitePageBodyElement.querySelector('.trip-events');

render(mainMenuElement, new MenuView());
render(tripFiltersElement, new FilterView(filters));

const tripMainElement = sitePageBodyElement.querySelector('.trip-main');
render(tripMainElement, new TripInfoView(pointsData), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView(pointsData));

const listPresenter = new PointListPresenter(tripBordElement);
listPresenter.init(pointsData);
