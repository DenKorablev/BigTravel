import dayjs from 'dayjs';
import { TYPES, CITES } from '../const.js';
import { getRandomArrayElement, dateConverter, getRandomInt } from '../util.js';

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

export const createEditPointTemplate = (pointData = {}) => {
  const {
    type = getRandomArrayElement(TYPES),
    price = 0,
    dueFrom = dayjs(),
    dueTo = dayjs(),
    destination = {
      name: getRandomArrayElement(CITES),
      description: '',
      pictures: ''
    },
    offers = [],
    isFavorite = false
  } = pointData;

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
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateConverter(dueFrom, 'DD/MM/YY hh:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateConverter(dueTo, 'DD/MM/YY hh:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
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
