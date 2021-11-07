
const COUNT_SIMILAR_OFFERS = 10;
const DIGITS_COORDINATES = 5;


const CITY_INFO = {
  LOCATION: {
    LAT: 35.6895,
    LNG: 139.69171,
  },
  ZOOM: 12,
};

const MARKER = {
  MAIN: {
    WIDTH: 52,
    HEIGHT: 52,
    getSize () {
      return [this.WIDTH, this.HEIGHT];
    },
    getAnchor () {
      return [this.WIDTH / 2, this.HEIGHT];
    },
  },
  DEFAULT: {
    WIDTH: 40,
    HEIGHT: 40,
    getSize () {
      return [this.WIDTH, this.HEIGHT];
    },
    getAnchor () {
      return [this.WIDTH / 2, this.HEIGHT];
    },
  },
};

const OfferType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const MinPriceByOfferType = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const ElementsSelectors = {
  formOffer: 'form.ad-form',
  formTitle: '#title',
  formPrice: '#price',
  formType: '#type',
  formRoomNumber: '#room_number',
  formCapacity: '#capacity',
  formTimeIn: '#timein',
  formTimeOut: '#timeout',
  formAddress: '#address',
  buttonSubmit: '.ad-form__submit',
  buttonReset: '.ad-form__reset',
};

const ElementsStates = {
  errorState: 'error-field',
  formDisabled: 'ad-form--disabled',
  filtersDisabled: 'map__filters--disabled',
};

export {
  COUNT_SIMILAR_OFFERS,
  DIGITS_COORDINATES,
  CITY_INFO,
  MARKER,
  OfferType,
  MinPriceByOfferType,
  ElementsSelectors,
  ElementsStates
};
