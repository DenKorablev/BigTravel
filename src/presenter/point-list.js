import PointListView from '../view/point-list.js';
import TripSortView from '../view/trip-sort.js';
import NoPointView from '../view/no-point.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import { render, replace } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';

export default class PointList {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointListComponent = new PointListView();
    this._sortComponent = new TripSortView();
    this._noPointComponent = new NoPointView();
  }

  init(points) {
    this._points = points.slice();
    render(this._pointListContainer, this._pointListComponent);
    this._renderTripBoard();
  }

  _renderSort() {
    render(this._pointListComponent, this._sortComponent);
  }

  _renderPoint(point) {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditPointView(point);

    const onEscKeydown = (evt, action) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        action(evt);
      }
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', (evt) => onEscKeydown(evt, replaceFormToPoint));
    };
    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', (evt) => onEscKeydown(evt, replaceFormToPoint));
    };

    pointComponent.setClickHandler(replacePointToForm);
    pointEditComponent.setEditClickHandler(replaceFormToPoint);
    pointEditComponent.setFormSubmitHandler(replaceFormToPoint);

    render(this._pointListComponent, pointComponent);
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
