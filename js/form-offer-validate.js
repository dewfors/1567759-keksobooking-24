import {MinPriceByOfferType, ElementsSelectors, ElementsStates, DIGITS_COORDINATES} from './utils/const.js';
import {formReset} from './form.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const TITLE_LENGTH_ERROR_MESSAGE = `Заголовок должен быть от ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`;
const PRICE_MAX = 1000000;
const ROOMS_MAX = 100;
const CAPACITY_NOT_FOR_GUEST = 0;
const ERROR_STATE = ElementsStates.errorState;

let priceMin = 1000;
const form = document.querySelector(ElementsSelectors.formOffer);
const title = form.querySelector(ElementsSelectors.formTitle);
const price = form.querySelector(ElementsSelectors.formPrice);
const type = form.querySelector(ElementsSelectors.formType);
const roomNumber = form.querySelector(ElementsSelectors.formRoomNumber);
const capacity = form.querySelector(ElementsSelectors.formCapacity);
const timeIn = form.querySelector(ElementsSelectors.formTimeIn);
const timeOut = form.querySelector(ElementsSelectors.formTimeOut);
const address = form.querySelector(ElementsSelectors.formAddress);
const buttonSubmit = form.querySelector(ElementsSelectors.buttonSubmit);
const buttonReset = form.querySelector(ElementsSelectors.buttonReset);
const checkLengthTitle = (value, minLength, maxLength) => value.length >= minLength && value.length <= maxLength;
const getPriceErrorMessage = () => `Цена должна быть от ${priceMin} до ${PRICE_MAX}`;
const checkLengthPrice = (value, min, max) => value >= min && value <= max;
const getCapacityErrorMessage = (capacityText, roomCount) => `${roomCount} комната(ы) не подходит ${capacityText}`;

const formValidationFields = [title, price, capacity];

const inputError = true;
const INPUT_STYLE_ERROR = '1px solid red';
const INPUT_STYLE = '1px solid #d9d9d3';

const toggleInputError = (element, isActive) => element.style.border = isActive ? INPUT_STYLE_ERROR : INPUT_STYLE;

const showValidationMessage = (element, message) => {
  element.setCustomValidity(message);
  element.classList.add(ERROR_STATE);
  toggleInputError(element, inputError);
  element.reportValidity();
};
const hideValidationMessage = (element) => {
  element.setCustomValidity('');
  element.classList.remove(ERROR_STATE);
  toggleInputError(element, !inputError);
};

const onCheckValidityTitle = () => {
  if (!checkLengthTitle(title.value, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)) {
    showValidationMessage(title, TITLE_LENGTH_ERROR_MESSAGE);
    return;
  }
  hideValidationMessage(title);
};

const onCheckValidityPrice = () => {
  if (!checkLengthPrice(price.value, priceMin, PRICE_MAX)) {
    showValidationMessage(price, getPriceErrorMessage());
    return;
  }
  hideValidationMessage(price);
};

const setMinPrice = () => {
  price.placeholder = MinPriceByOfferType[type.options[type.options.selectedIndex].value];
};

const onchangeTypeOffer = (evt) => {
  const selectedIndex = evt.target.options.selectedIndex;
  const selectedValue = evt.target.options[selectedIndex].value;

  price.placeholder = MinPriceByOfferType[selectedValue];
  priceMin = MinPriceByOfferType[selectedValue];

  onCheckValidityPrice();
};

const onchangeCapacity = (evt) => {
  const selectedIndexCapacity = evt.target.options.selectedIndex;
  const capacityCount = Number(evt.target.options[selectedIndexCapacity].value);
  const capacityText = evt.target.options[selectedIndexCapacity].text;
  const roomCount = Number(roomNumber.options[roomNumber.options.selectedIndex].value);

  if (roomCount < ROOMS_MAX && capacityCount > roomCount){
    showValidationMessage(capacity, getCapacityErrorMessage(capacityText, roomCount));
    return;
  } else if (roomCount < ROOMS_MAX && capacityCount === CAPACITY_NOT_FOR_GUEST) {
    showValidationMessage(capacity, getCapacityErrorMessage(capacityText, roomCount));
    return;
  } else if (roomCount === ROOMS_MAX && capacityCount !== CAPACITY_NOT_FOR_GUEST) {
    showValidationMessage(capacity, getCapacityErrorMessage(capacityText, roomCount));
    return;
  }

  hideValidationMessage(capacity);

};

const onchangeTimeIn = (evt, time) => {
  time.selectedIndex = evt.target.options.selectedIndex;
};

const onChangeAddress = (lat, lng) => {
  address.value = `${lat.toFixed(DIGITS_COORDINATES)}, ${lng.toFixed(DIGITS_COORDINATES)}`;
};

const isFormValid = () => {
  let isValid = true;
  formValidationFields.forEach((elem) => {
    if (!elem.validity.valid) {
      isValid = false;
    }
  });
  return isValid;
};

const setFormValidation = () => {
  title.addEventListener('input', onCheckValidityTitle);

  price.addEventListener('input', onCheckValidityPrice);

  type.addEventListener('change', onchangeTypeOffer);

  capacity.addEventListener('change', onchangeCapacity);

  timeIn.addEventListener('change', (evt) => {
    onchangeTimeIn(evt, timeOut);
  });
  timeOut.addEventListener('change', (evt) => {
    onchangeTimeIn(evt, timeIn);
  });

  buttonSubmit.addEventListener('click', () => {
    formValidationFields
      .filter((elem) => !elem.checkValidity())
      .forEach((elem) => toggleInputError(elem, inputError));
  });

  buttonReset.addEventListener('click', () => {
    formReset();
  });

};

export {
  form,
  title,
  price,
  capacity,
  address,
  onChangeAddress,
  setFormValidation,
  setMinPrice,
  isFormValid
};
