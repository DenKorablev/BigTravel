import dayjs from 'dayjs';
import { TYPES, CITES, DATE_FORMAT } from '../const.js';
import { dateConverter, compareTwoDate } from '../utils/date.js';
import { getRandomInt, getRandomArrayElement } from '../utils/common.js';
import SmartView from './smart.js';
import { OFFERS, getDestination } from '../mock/data.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const DEFAULT_PARAMS = {
  type: getRandomArrayElement(TYPES),
  price: 0,
  dueFrom: dayjs(),
  dueTo: dayjs(),
  destination: {
    name: getRandomArrayElement(CITES),
    description: '',
    pictures: []
  },
  offers: [],
};

const createTypesContainer = (selectedtype) => `
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${selectedtype}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
          ${TYPES.map((type) => `
            <div class="event__type-item">
              <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${selectedtype === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
            </div>
          `).join(' ')};
      </fieldset>
    </div>
  `;

const createDestinationContainer = () => `
    <datalist id="destination-list-1">
      ${CITES.map((city) => `
        <option value="${city}"></option>
      `).join(' ')};
    </datalist>
  `;

const createPicturesContainer = (pictures) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map((pic) => `
        <img class="event__photo" src="${pic.src}" alt="Event photo">
      `).join(' ')}
    </div>
  </div>
`;

const createOffersContainer = (offers) => offers.length ? `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${offers.map((offer) => {
    const offerClass = offer.name.split(' ').pop();
    const checked = getRandomInt() ? 'checked' : '';
    return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerClass}-1" type="checkbox" name="event-offer-${offerClass}" ${checked}>
          <label class="event__offer-label" for="event-offer-${offerClass}-1">
            <span class="event__offer-title">${offer.name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `;
  }).join(' ')}
    </div>
  </section>
` : '';

const createEditPointTemplate = (pointData, pointEditMode) => {
  const { type, price, dueFrom, dueTo, destination, offers } = pointData;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            ${createTypesContainer(type)}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            ${createDestinationContainer()}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateConverter(dueFrom, DATE_FORMAT.DMY_HM)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateConverter(dueTo, DATE_FORMAT.DMY_HM)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${pointEditMode ? 'Delete' : 'Cancel'}</button>
          ${pointEditMode ? `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
          </button>` : ''}
        </header>
        <section class="event__details">
          ${createOffersContainer(offers)}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            ${createPicturesContainer(destination.pictures)}
          </section>
        </section>
      </form>
    </li>`;
};

export default class EditPoint extends SmartView {
  constructor(pointData = DEFAULT_PARAMS, pointEditMode = false) {
    super();
    this._pointData = EditPoint.parsePointToData(pointData);
    this._pointEditMode = pointEditMode;
    this._datepicker = {};

    this._editClickHandler = this._editClickHandler.bind(this);
    this._deleteClicktHandler = this._deleteClicktHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeInputHandler = this._typeInputHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._dueFromChangeHandler = this._dueFromChangeHandler.bind(this);
    this._dueToChangeHandler = this._dueToChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  getTemplate() {
    return createEditPointTemplate(this._pointData, this._pointEditMode);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setEditClickHandler(this._callback.editClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseDataToPoint(this._pointData));
  }

  _deleteClicktHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditPoint.parseDataToPoint(this._pointData));
  }

  _editClickHandler() {
    this._callback.editClick();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('change', this._typeInputHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationInputHandler);
  }

  _setDatepicker() {
    if (Object.values(this._datepicker).length) {
      this._datepicker.startDate.destroy();
      this._datepicker.endDate.destroy();
      this._datepicker = {};
    }

    this._datepicker.startDate = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: DATE_FORMAT.FLATPICKER_DATE,
        defaultDate: this._pointData.dueFrom,
        onChange: this._dueFromChangeHandler,
      },
    );

    this._datepicker.endDate = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: DATE_FORMAT.FLATPICKER_DATE,
        defaultDate: this._pointData.dueTo,
        onChange: this._dueToChangeHandler,
      },
    );
  }

  _typeInputHandler(evt) {
    evt.preventDefault();
    const type = evt.target.value;
    this.updateData({
      type,
      offers: OFFERS.get(type) || []
    });
  }

  _dueFromChangeHandler([valueDate]) {
    if (compareTwoDate(this._pointData.dueFrom, valueDate) > 0) {
      this.updateData({ dueFrom: this._pointData.dueTo });
      return;
    }
    this.updateData({
      dueFrom: valueDate,
    });
  }

  _dueToChangeHandler([valueDate]) {
    if (compareTwoDate(this._pointData.dueTo, valueDate) < 0) {
      this.updateData({ dueTo: this._pointData.dueFrom });
      return;
    }
    this.updateData({
      dueTo: valueDate,
    });
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: getDestination(),
    });
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClicktHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  reset(point) {
    this.updateData(
      EditPoint.parsePointToData(point),
    );
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
    );
  }

  static parseDataToPoint(data) {
    return Object.assign({}, data);
  }
}
