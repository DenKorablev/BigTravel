import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import { generatePointData } from './mock/data.js';
import { render, RenderPosition } from './utils/render.js';
import PointListPresenter from './presenter/point-list.js';
import FilterPresenter from './presenter/filter.js';
import { MainMenu } from './const.js';

const MOKO_COUNT = 15;
const pointsData = new Array(MOKO_COUNT).fill().map(generatePointData).sort((a, b) => a.dueFrom - b.dueFrom);

const pointsModel = new PointsModel();
pointsModel.setPoints(pointsData);

const filterModel = new FilterModel();
const menuComponent = new MenuView();

const sitePageBodyElement = document.querySelector('.page-body');
const mainMenuElement = sitePageBodyElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = sitePageBodyElement.querySelector('.trip-controls__filters');
const tripBordElement = sitePageBodyElement.querySelector('.trip-events');

render(mainMenuElement, menuComponent);

const tripMainElement = sitePageBodyElement.querySelector('.trip-main');
render(tripMainElement, new TripInfoView(pointsData), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView(pointsData));

const listPresenter = new PointListPresenter(tripBordElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersElement, pointsModel, filterModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MainMenu.TABLE:
      listPresenter.init();
      break;
    case MainMenu.STATS:
      listPresenter.destroy();
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
listPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  listPresenter.createTask();
});
