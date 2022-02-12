import PointListView from '../view/point-list.js';
import TripSortView from '../view/trip-sort.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point.js';
import { render, remove } from '../utils/render.js';
import { SORT_TYPE, UserAction, UpdateType } from '../const.js';
import { sortByTime, sortByPrice } from '../utils/date.js';
import { filter } from '../utils/filter.js';

export default class PointList {
  constructor(pointListContainer, pointsModel, filterModel) {
    this._pointListContainer = pointListContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._currentSortType = SORT_TYPE.DAY;
    this._pointPresenter = {};

    this._sortComponent = null;

    this._pointListComponent = new PointListView();
    this._noPointComponent = new NoPointView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SORT_TYPE.DAY:
        return filtredPoints.sort((a, b) => a.dueFrom - b.dueFrom);
      case SORT_TYPE.TIME:
        return filtredPoints.sort(sortByTime);
      case SORT_TYPE.PRICE:
        return filtredPoints.sort(sortByPrice);
    }
    return filtredPoints;
  }

  init() {
    render(this._pointListContainer, this._pointListComponent);
    this._renderTripBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearPointList();
    this._renderTripBoard();
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearPointList();
        this._renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this._clearPointList({resetSortType: true});
        this._renderTripBoard();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new TripSortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._pointListComponent, this._sortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPointList({resetSortType = false} = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SORT_TYPE.DEFAULT;
    }
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this.pointListContainer, this._noPointComponent);
  }

  _renderTripBoard() {
    const pointsCount = this._getPoints().length;
    const points = this._getPoints().slice();

    if (pointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(points);
  }
}
