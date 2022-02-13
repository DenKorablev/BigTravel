import EditPointView from '../view/edit-point.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import { UserAction, UpdateType } from '../const.js';
import { nanoid } from 'nanoid';

export default class Point {
  constructor(pointContainer, changeData) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new EditPointView();
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
/*     this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick); */

    render(this._pointContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}

