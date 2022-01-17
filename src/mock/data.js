import dayjs from 'dayjs';
import { TYPES, CITES } from '../const.js';
import { getRandomInt, getRandomArrayElement, makeRandomArrayGenerator } from '../util.js';

const PRICE = {
  MIN: 20,
  MAX: 2500
};

const OFFERS = new Map([
  ['Taxi', [
    {
      name: 'Order Uber',
      price: 20
    },
    {
      name: 'Order Comfort',
      price: 30
    },
    {
      name: 'Order Luxe',
      price: 10
    },
  ]],
  ['Bus', [
    {
      name: 'Comfort',
      price: 10
    },
    {
      name: 'Microbus',
      price: 20
    }
  ]],
  ['Train', [
    {
      name: 'Metro',
      price: 5
    },
    {
      name: 'Luxe Train',
      price: 25
    },
    {
      name: 'Comfort Train',
      price: 15
    },
    {
      name: 'Electric train',
      price: 20
    }
  ]],
  ['Ship', [
    {
      name: 'Speedboat',
      price: 33
    }
  ]],
  ['Transport', [
    {
      name: 'Add Transport',
      price: 15
    },
    {
      name: 'Switch Transport',
      price: 15
    }
  ]],
  ['Drive', [
    {
      name: 'Car',
      price: 35
    },
    {
      name: 'Moto',
      price: 15
    },
    {
      name: 'Truck',
      price: 65
    }
  ]],
  ['Flight', [
    {
      name: 'Flight',
      price: 55
    }
  ]],
]);

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const getDestination = (type) => {
  const description = makeRandomArrayGenerator(DESCRIPTIONS).join(' ');
  return {
    description,
    name: `${type} ${getRandomArrayElement(CITES)}`,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 10)}`,
      }
    ]
  };
};

const getOffersType = (type) => {
  const offerType = OFFERS.get(type);
  return offerType ? makeRandomArrayGenerator(offerType) : [];
};

export const generatePointData = () => {
  const dueFrom = dayjs().add(getRandomInt(-500, 10000), 'm').toDate();
  const dueTo = dayjs(dueFrom).add(getRandomInt(180, 2880), 'm').toDate();
  const type = TYPES[getRandomInt(0, TYPES.length - 1)];

  return {
    price: getRandomInt(PRICE.MIN, PRICE.MAX),
    dueFrom,
    dueTo,
    destination: getDestination(type),
    isFavorite: Boolean(getRandomInt()),
    offers: getOffersType(type),
    type
  };
};

