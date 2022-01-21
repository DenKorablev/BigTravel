import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FilterView from './view/filter.js';
import TripSortView from './view/trip-bord.js';
import PointView from './view/point.js';
import EditPointView from './view/edit-point.js';
import PointListView from './view/point-list.js';
import NoPointView from './view/no-point.js';
import { generatePointData } from './mock/data.js';
import { generateFilter } from './mock/filters.js';
import { render, RenderPosition, isEscEvent } from './util.js';

const MOKO_COUNT = 15;
const pointsData = new Array(MOKO_COUNT).fill().map(generatePointData).sort((a, b) => a.dueFrom - b.dueFrom);
const filters = generateFilter(pointsData);

const sitePageBodyElement = document.querySelector('.page-body');
const mainMenuElement = sitePageBodyElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = sitePageBodyElement.querySelector('.trip-controls__filters');
const tripBordElement = sitePageBodyElement.querySelector('.trip-events');

const renderPoints = (list, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replaceFormToPoint = () => {
    list.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const replacePointToForm = () => {
    list.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeydown);
  });

  pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(list, pointComponent.getElement());
};

const renderBord = (points) => {
  const tripBoardList = new PointListView();
  if (points.length === 0) {
    render(tripBordElement, new NoPointView().getElement());
  } else {
    const tripBordComponent = new TripSortView();
    render(tripBordElement, tripBordComponent.getElement());
    render(tripBordElement, tripBoardList.getElement());

    const tripMainElement = sitePageBodyElement.querySelector('.trip-main');
    render(tripMainElement, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);

    const tripInfoElement = tripMainElement.querySelector('.trip-info');
    render(tripInfoElement, new TripCostView(points).getElement());

    for(let i = 0; i < points.length; i++) {
      renderPoints(tripBoardList.getElement(), points[i]);
    }
  }
};

render(mainMenuElement, new MenuView().getElement());
render(tripFiltersElement, new FilterView(filters).getElement());
renderBord(pointsData);

