import {MinPriceByOfferType, ElementsClassNames} from './utils/const.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const TITLE_LENGTH_ERROR_MESSAGE = `Заголовок должен быть от ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`;
const PRICE_MAX = 1000000;
const ROOMS_MAX = 100;
const CAPACITY_NOT_FOR_GUEST = 0;
const ERROR_STATE = ElementsClassNames.errorState;

let priceMin = 1000;
const form = document.querySelector(ElementsClassNames.formOffer);
const title = form.querySelector(ElementsClassNames.formTitle);
const price = form.querySelector(ElementsClassNames.formPrice);
const type = form.querySelector(ElementsClassNames.formType);
const roomNumber = form.querySelector(ElementsClassNames.formRoomNumber);
const capacity = form.querySelector(ElementsClassNames.formCapacity);
const timeIn = form.querySelector(ElementsClassNames.formTimeIn);
const timeOut = form.querySelector(ElementsClassNames.formTimeOut);
const checkLengthTitle = (value, minLength, maxLength) => value.length >= minLength && value.length <= maxLength;
const getPriceErrorMessage = () => `Цена должна быть от ${priceMin} до ${PRICE_MAX}`;
const checkLengthPrice = (value, min, max) => value >= min && value <= max;
const getCapacityErrorMessage = (capacityText, roomCount) => `${roomCount} комната(ы) не подходит ${capacityText}`;

const showValidationMessage = (element, message) => {
  element.setCustomValidity(message);
  element.classList.add(ERROR_STATE);
};
const hideValidationMessage = (element) => {
  element.setCustomValidity('');
  element.classList.remove(ERROR_STATE);
};

const onCheckValidityTitle = () => {
  if (!checkLengthTitle(title.value, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)) {
    showValidationMessage(title, TITLE_LENGTH_ERROR_MESSAGE);
  } else {
    hideValidationMessage(title);
  }
  title.reportValidity();
};

title.addEventListener('input', onCheckValidityTitle);

const onCheckValidityPrice = () => {
  if (!checkLengthPrice(price.value, priceMin, PRICE_MAX)) {
    showValidationMessage(price, getPriceErrorMessage());
  } else {
    hideValidationMessage(price);
  }
  price.reportValidity();
};

price.addEventListener('input', onCheckValidityPrice);

const onchangeTypeOffer = (evt) => {
  const selectedIndex = evt.target.options.selectedIndex;
  const selectedValue = evt.target.options[selectedIndex].value;

  price.placeholder = MinPriceByOfferType[selectedValue];
  priceMin = MinPriceByOfferType[selectedValue];

  onCheckValidityPrice();
};
type.addEventListener('change', onchangeTypeOffer);

const onchangeCapacity = (evt) => {
  const selectedIndexCapacity = evt.target.options.selectedIndex;
  const capacityCount = Number(evt.target.options[selectedIndexCapacity].value);
  const capacityText = evt.target.options[selectedIndexCapacity].text;
  const roomCount = Number(roomNumber.options[roomNumber.options.selectedIndex].value);

  if (roomCount < ROOMS_MAX && capacityCount > roomCount){
    showValidationMessage(capacity, getCapacityErrorMessage(capacityText, roomCount));
  } else if (roomCount < ROOMS_MAX && capacityCount === CAPACITY_NOT_FOR_GUEST) {
    showValidationMessage(capacity, getCapacityErrorMessage(capacityText, roomCount));
  } else if (roomCount === ROOMS_MAX && capacityCount !== CAPACITY_NOT_FOR_GUEST) {
    showValidationMessage(capacity, getCapacityErrorMessage(capacityText, roomCount));
  } else {
    hideValidationMessage(capacity);
  }

  capacity.reportValidity();

};

capacity.addEventListener('change', onchangeCapacity);

const onchangeTimeIn = (evt, time) => {
  time.selectedIndex = evt.target.options.selectedIndex;
};

timeIn.addEventListener('change', (evt) => {
  onchangeTimeIn(evt, timeOut);
});
timeOut.addEventListener('change', (evt) => {
  onchangeTimeIn(evt, timeIn);
});

export {form, title, price, capacity};
