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
  formDisabled: 'ad-form--disabled',
  filtersDisabled: 'map__filters--disabled',
};


export {
  OfferType,
  MinPriceByOfferType,
  ElementsClassNames
};
