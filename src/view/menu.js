import AbstractView from './abstract.js';
import { MainMenu } from '../const.js';

const createMenuTemplate = () =>
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-id="${MainMenu.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" data-id="${MainMenu.STATS}">Stats</a>
  </nav>`;

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._active = 'TABLE';
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._items, this._active);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.dataset.id === this._active) {
      return;
    }
    this._callback.menuClick(evt.target.dataset.id);
    this._active = evt.target.dataset.id;
    this._setMenuItem();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _setMenuItem() {
    const current = this.getElement().querySelector(`[data-id=${MainMenu.TABLE}]`);
    const item = this.getElement().querySelector(`[data-id=${MainMenu.STATS}]`);
    if (item !== null && current !== null) {
      current.classList.toggle('trip-tabs__btn--active');
      item.classList.toggle('trip-tabs__btn--active');
    }
  }
}
