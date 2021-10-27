import {
  createObjects
} from './utils/data.js';

import {
  OfferType
} from './utils/const.js';

const similarOffers = createObjects();

const cardListElement = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const cardListFragment = document.createDocumentFragment();

const createOfferFeaturesListElement = (feature) => {
  const newFeatureElement = document.createElement('li');
  newFeatureElement.classList.add('popup__feature');
  newFeatureElement.classList.add(`popup__feature--${feature}`);
  return newFeatureElement;
};

const createOfferPhotoListElement = (photo) => {
  const newPhotoElement = document.createElement('img');
  newPhotoElement.classList.add('popup__photo');
  newPhotoElement.src = photo;
  newPhotoElement.width = 45;
  newPhotoElement.height = 40;
  newPhotoElement.alt = 'Фотография жилья';
  return newPhotoElement;
};

const getFeaturesElements = (cardElement, features) => {
  const listFeaturesElement = cardElement.querySelector('.popup__features').cloneNode(true);

  const  featureChilds = listFeaturesElement.querySelectorAll('.popup__feature');
  featureChilds.forEach((feature) => {
    listFeaturesElement.removeChild(feature);
  });

  features.forEach((feature) => {
    const newFeature = createOfferFeaturesListElement(feature);
    listFeaturesElement.appendChild(newFeature);
  });
  return listFeaturesElement;
};

const getPhotosElements = (cardElement, photos) => {
  const listPhotosElement = cardElement.querySelector('.popup__photos').cloneNode(true);

  const  photosChilds = listPhotosElement.querySelectorAll('.popup__photo');
  photosChilds.forEach((photo) => {
    listPhotosElement.removeChild(photo);
  });

  photos.forEach((photo) => {
    const newPhoto = createOfferPhotoListElement(photo);
    listPhotosElement.appendChild(newPhoto);
  });
  return listPhotosElement;
};

const removeEmptyHtmlElements = (data) => {
  const elements = [...data.children];

  elements.forEach((element) => {
    if (element.src === '' || element.innerHTML === '' && element.tagName.toLowerCase() !== 'img') {
      element.remove();
    }
  });
};

const createCardElement = (ad) => {
  const { author, offer } = ad;
  const cardElement = cardTemplate.cloneNode(true);

  if (offer) {
    const {
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos,
    } = offer;

    for (const [key, value] of Object.entries(author)) {
      cardElement.querySelector(`[data-card='${key}']`).src = value;
    }

    for (const [key, value] of Object.entries(offer)) {
      switch (key) {
        case 'price':
          cardElement.querySelector(`[data-card='${key}']`).textContent = `${price} ₽/ночь`;
          break;
        case 'type':
          cardElement.querySelector(`[data-card='${key}']`).textContent = OfferType[type];
          break;
        case 'rooms':
          cardElement.querySelector(`[data-card='${key}']`).textContent = `${rooms} комнаты для ${guests} гостей`;
          break;
        case 'guests':
          break;
        case 'checkin':
          cardElement.querySelector(`[data-card='${key}']`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
          break;
        case 'checkout':
          break;
        case 'features':
          if (features) {
            cardElement.replaceChild(getFeaturesElements(cardElement, features), cardElement.querySelector('.popup__features'));
          }
          break;
        case 'description':
          cardElement.querySelector(`[data-card='${key}']`).textContent = description;
          break;
        case 'photos':
          if (photos) {
            cardElement.replaceChild(getPhotosElements(cardElement, photos), cardElement.querySelector('.popup__photos'));
          }
          break;
        default:
          cardElement.querySelector(`[data-card='${key}']`).textContent = value;
          break;
      }
    }
    // cardListFragment.appendChild(cardElement);

  }
  removeEmptyHtmlElements(cardElement);

  return cardElement;
};

// createCardElement(similarOffers[1]);
// cardListElement.appendChild(cardListFragment);

const createCardList = (data) => data.map(createCardElement);


export {createCardList};
