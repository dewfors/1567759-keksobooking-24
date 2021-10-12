import {getRandomFloatFromRange, getRandomIntegerFromRange, getRandomiseArray} from './util.js';

const getOfferTitle = () => {
  const offerTitles = [
    'Без залога. Без комиссии. Есть возможность снять почасово',
    'АРЕНДА, ПОСУТОЧНАЯ И ПО ЧАСАМ',
    'Без комиссии! 24 часа! Отличная квартира, евро ремонт',
    'Шикарная однокомнатная квартира в 2-х минутах от метро',
    'Светлая, квартира на час, сутки, квартира посуточно',
    'Надежная, уютная современная квартира',
  ];
  return offerTitles[getRandomIntegerFromRange(0, offerTitles.length - 1)];
};

const getOfferType = () => {
  const offerTypes = [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel',
  ];
  return offerTypes[getRandomIntegerFromRange(0, offerTypes.length - 1)];
};

const getOfferCheck = () => {
  const offerChecks = [
    '12:00',
    '13:00',
    '14:00',
  ];
  return offerChecks[getRandomIntegerFromRange(0, offerChecks.length - 1)];
};

const getOfferFeatures = () => {
  const offerFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  const random = getRandomIntegerFromRange(1, offerFeatures.length);
  return getRandomiseArray(offerFeatures, random);
};

const getOfferPhotos = () => {
  const offerPhotos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const random = getRandomIntegerFromRange(1, offerPhotos.length);
  return getRandomiseArray(offerPhotos, random);
};

const generateDescription = () => {
  const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

  const descriptionSentenceMin = 1;
  const descriptionSentenceMax = 5;

  const descriptionArray = descriptionText.split('.')
    .map((text) => text.trim())
    .filter((text) => text.length > 0);

  const randomCountDescriptionSentence = getRandomIntegerFromRange(descriptionSentenceMin, descriptionSentenceMax);
  const randomDescriptionArray = getRandomiseArray(descriptionArray, randomCountDescriptionSentence);
  return randomDescriptionArray.join('. ').trim();
};


const createObject = (id = 1) => {
  const userId = String(id).length === 1 ? `0${id}` : `${id}`;
  const lat = getRandomFloatFromRange(35.65000, 35.70000, 5);
  const lng = getRandomFloatFromRange(139.70000, 139.80000, 5);


  return {
    author: {
      avatar: `img/avatars/user${userId}.png`,
    },
    offer: {
      title: getOfferTitle(),
      address: `${lat}, ${lng}`,
      price: getRandomIntegerFromRange(2000, 10500),
      type: getOfferType(),
      rooms: getRandomIntegerFromRange(1, 5),
      guests: getRandomIntegerFromRange(1, 5),
      checkin: getOfferCheck(),
      checkout: getOfferCheck(),
      features: getOfferFeatures(),
      description: generateDescription(),
      photos: getOfferPhotos(),
    },
    location: {
      lat,
      lng,
    },
  };
};

const createObjects = () => new Array(10)
  .fill(null)
  .map((value, index) => createObject(index + 1));

export {createObjects};
