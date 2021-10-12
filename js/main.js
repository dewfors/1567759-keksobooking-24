const showFunctionException = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw 'Параметры функции должны быть числами';
  }

  if (min < 0 || max < 0) {
    throw 'Диапазон не может быть отрицательным';
  }

  if (min > max) {
    throw 'Неверный диапазон';
  }
};

const getRandomIntegerFromRange = (min = 0, max = 10) => {
  showFunctionException(min, max);

  if (min === max) {
    return Math.floor(min);
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getTruncatedNumber = (num, lengthNumbersAfterDot) => {
  const BASE_DEGREE_NUMBER = 10;
  return Math.trunc(num * BASE_DEGREE_NUMBER ** lengthNumbersAfterDot) / BASE_DEGREE_NUMBER ** lengthNumbersAfterDot;
};

const getRandomFloatFromRange = (min = 0, max = 10, lengthNumbersAfterDot = 2) => {
  showFunctionException(min, max);

  let randomNumber = 0;

  if (min === max) {
    randomNumber = min;
  } else {
    randomNumber = min + Math.random() * (max - min);
  }

  return getTruncatedNumber(randomNumber, lengthNumbersAfterDot);
};

const getRandomiseArray = (array, countOfElements) => {
  const copyArray = array.slice();

  const result = [];
  while (copyArray.length > 0) {
    const random = getRandomIntegerFromRange(0, copyArray.length-1);
    const elem = copyArray.splice(random, 1)[0];
    result.push(elem);
  }

  return result.slice(0, countOfElements);
};


getRandomIntegerFromRange(1, 10);
getRandomFloatFromRange(1.11, 10.11, 3);


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

const objects = [];

const createObjects = () => {
  for (let i = 1; i <= 10; i++) {
    objects.push(createObject(i));
  }
};

createObjects();

