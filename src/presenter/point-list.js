import PointListView from '../view/point-list.js';
import TripSortView from '../view/trip-sort.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point.js';
import { render } from '../utils/render.js';
import { SORT_TYPE } from '../const.js';
import { sortByTime, sortByPrice } from '../utils/date.js';

export default class PointList {
  constructor(pointListContainer, pointsModel) {
    this._pointListContainer = pointListContainer;
    this._pointsModel = pointsModel;

    this._currentSortType = SORT_TYPE.DAY;
    this._pointPresenter = {};

    this._pointListComponent = new PointListView();
    this._sortComponent = new TripSortView();
    this._noPointComponent = new NoPointView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SORT_TYPE.DAY:
        return this._pointsModel.getPoints().sort((a, b) => a.dueFrom - b.dueFrom);
      case SORT_TYPE.TIME:
        return this._points.getPoints().sort(sortByTime);
      case SORT_TYPE.PRICE:
        return this._points.getPoints().sort(sortByPrice);
    }
    return this._pointsModel.getPoints();
  }

  init() {
    render(this._pointListContainer, this._pointListComponent);
    this._renderTripBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);
    this._clearPointList();
    this._renderTripBoard();
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._pointListComponent, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
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

    if (pointsCount.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(points);
  }
}
