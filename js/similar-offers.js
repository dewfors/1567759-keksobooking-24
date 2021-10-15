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

const createCardElement = (ad) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = OfferType[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  if (ad.offer.features) {
    const listFeaturesElementTemplate = cardElement.querySelector('.popup__features');
    const listFeaturesElement = document.createElement('ul');
    listFeaturesElement.classList.add('popup__features');
    ad.offer.features.forEach((feature) => {
      const newFeature = createOfferFeaturesListElement(feature);
      listFeaturesElement.appendChild(newFeature);
    });
    cardElement.replaceChild(listFeaturesElement, listFeaturesElementTemplate);
  } else {
    cardElement.removeChild(cardElement.querySelector('.popup__features'));
  }

  if (ad.offer.description) {
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    cardElement.removeChild(cardElement.querySelector('.popup__description'));
  }

  if (ad.offer.photos) {
    const listPhotosElementTemplate = cardElement.querySelector('.popup__photos');
    const listPhotosElement = document.createElement('div');
    listPhotosElement.classList.add('popup__photos');
    ad.offer.photos.forEach((photo) => {
      const newPhotoElement = createOfferPhotoListElement(photo);
      listPhotosElement.appendChild(newPhotoElement);
    });
    cardElement.replaceChild(listPhotosElement, listPhotosElementTemplate);
  } else {
    cardElement.removeChild(cardElement.querySelector('.popup__photos'));
  }

  cardListFragment.appendChild(cardElement);
};

createCardElement(similarOffers[0]);
cardListElement.appendChild(cardListFragment);
