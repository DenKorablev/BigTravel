import PointListView from '../view/point-list.js';
import TripSortView from '../view/trip-sort.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point.js';
import { render } from '../utils/render.js';
import { updateItem } from '../utils/common.js';

export default class PointList {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointPresenter = {};

    this._pointListComponent = new PointListView();
    this._sortComponent = new TripSortView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    render(this._pointListContainer, this._pointListComponent);
    this._renderTripBoard();
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSort() {
    render(this._pointListComponent, this._sortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange);
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
