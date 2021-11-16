
const COUNT_SIMILAR_OFFERS = 10;
const DIGITS_COORDINATES = 5;


const CITY_INFO = {
  LOCATION: {
    LAT: 35.6895,
    LNG: 139.69171,
  },
  ZOOM: 12,
};

const marker = {
  main: {
    width: 52,
    height: 52,
    getSize () {
      return [this.width, this.height];
    },
    getAnchor () {
      return [this.width / 2, this.height];
    },
  },
  DEFAULT: {
    width: 40,
    height: 40,
    getSize () {
      return [this.width, this.height];
    },
    getAnchor () {
      return [this.width / 2, this.height];
    },
  },
};

const OfferType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

const minPriceByOfferType = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const ElementsSelectors = {
  FORM_OFFER: 'form.ad-form',
  FORM_TITLE: '#title',
  FORM_PRICE: '#price',
  FORM_TYPE: '#type',
  FORM_ROOM_NUMBER: '#room_number',
  FORM_CAPACITY: '#capacity',
  FORM_TIME_IN: '#timein',
  FORM_TIME_OUT: '#timeout',
  FORM_ADDRESS: '#address',
  BUTTON_SUBMIT: '.ad-form__submit',
  BUTTON_RESET: '.ad-form__reset',
};

const ElementsStates = {
  ERROR_STATE: 'error-field',
  FORM_DISABLED: 'ad-form--disabled',
  FILTERS_DISABLED: 'map__filters--disabled',
};

export {
  COUNT_SIMILAR_OFFERS,
  DIGITS_COORDINATES,
  CITY_INFO,
  marker,
  OfferType,
  minPriceByOfferType,
  ElementsSelectors,
  ElementsStates
};
