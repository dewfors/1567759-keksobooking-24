const CITY_INFO = {
  LOCATION: {
    LAT: 35.6895,
    LNG: 139.69171,
  },
  ZOOM: 10,
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

const ElementsClassNames = {
  errorState: 'error-field',
  formOffer: 'form.ad-form',
  formTitle: '#title',
  formPrice: '#price',
  formType: '#type',
  formRoomNumber: '#room_number',
  formCapacity: '#capacity',
  formTimeIn: '#timein',
  formTimeOut: '#timeout',
};

const ElementsStatusClassNames = {
  formDisabled: 'ad-form--disabled',
  filtersDisabled: 'map__filters--disabled',
};


export {
  CITY_INFO,
  OfferType,
  MinPriceByOfferType,
  ElementsClassNames,
  ElementsStatusClassNames
};
