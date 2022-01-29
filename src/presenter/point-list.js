import PointListView from '../view/point-list.js';
import TripSortView from '../view/trip-sort.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point.js';
import { render } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { SORT_TYPE } from '../const.js';
import { sortByTime, sortByPrice } from '../utils/date.js';

export default class PointList {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._currentSortType = SORT_TYPE.DAY;
    this._pointPresenter = {};

    this._pointListComponent = new PointListView();
    this._sortComponent = new TripSortView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    render(this._pointListContainer, this._pointListComponent);
    this._renderTripBoard();
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this._points.sort((a, b) => a.dueFrom - b.dueFrom);
        break;
      case SORT_TYPE.TIME:
        this._points.sort(sortByTime);
        break;
      case SORT_TYPE.PRICE:
        this._points.sort(sortByPrice);
        break;
      default:
        throw new Error(`Ошибка типа ${sortType}`);
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);
    this._clearPointList();
    this._renderTripBoard();
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
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
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderPoints() {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this.pointListContainer, this._noPointComponent);
  }

  _renderTripBoard() {
    if (this._points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints();
  }
}
