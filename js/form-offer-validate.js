import {MinPriceByOfferType, ElementsSelectors, ElementsStates, DIGITS_COORDINATES} from './utils/const.js';
import {formReset} from './form.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const TITLE_LENGTH_ERROR_MESSAGE = `Заголовок должен быть от ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`;
const PRICE_MAX = 1000000;
const ROOMS_MAX = 100;
const CAPACITY_NOT_FOR_GUEST = 0;
const ERROR_STATE = ElementsStates.errorState;
const INPUT_STYLE_ERROR = '1px solid red';
const INPUT_STYLE = '1px solid #d9d9d3';

let priceMin = 1000;
const formOffer = document.querySelector(ElementsSelectors.formOffer);
const titleOffer = formOffer.querySelector(ElementsSelectors.formTitle);
const pricePerNight = formOffer.querySelector(ElementsSelectors.formPrice);
const typeOfHousing = formOffer.querySelector(ElementsSelectors.formType);
const NumberOfRooms = formOffer.querySelector(ElementsSelectors.formRoomNumber);
const numberOfSeats = formOffer.querySelector(ElementsSelectors.formCapacity);
const checkInTime = formOffer.querySelector(ElementsSelectors.formTimeIn);
const checkOutTime = formOffer.querySelector(ElementsSelectors.formTimeOut);
const housingAddress = formOffer.querySelector(ElementsSelectors.formAddress);
const buttonSubmit = formOffer.querySelector(ElementsSelectors.buttonSubmit);
const buttonReset = formOffer.querySelector(ElementsSelectors.buttonReset);
const checkLengthTitle = (value, minLength, maxLength) => value.length >= minLength && value.length <= maxLength;
const getPriceErrorMessage = () => `Цена должна быть от ${priceMin} до ${PRICE_MAX}`;
const checkLengthPrice = (value, min, max) => value >= min && value <= max;
const getCapacityErrorMessage = (capacityText, roomCount) => `${roomCount} комната(ы) не подходит ${capacityText}`;

const formValidationFields = [titleOffer, pricePerNight, numberOfSeats];
const inputError = true;

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
  if (!checkLengthTitle(titleOffer.value, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)) {
    showValidationMessage(titleOffer, TITLE_LENGTH_ERROR_MESSAGE);
    return;
  }
  hideValidationMessage(titleOffer);
};

const onCheckValidityPrice = () => {
  if (!checkLengthPrice(pricePerNight.value, priceMin, PRICE_MAX)) {
    showValidationMessage(pricePerNight, getPriceErrorMessage());
    return;
  }
  hideValidationMessage(pricePerNight);
};

const setMinPrice = () => {
  pricePerNight.placeholder = MinPriceByOfferType[typeOfHousing.options[typeOfHousing.options.selectedIndex].value];
};

const onInputTitle = () => onCheckValidityTitle();
const onInputPrice = () => onCheckValidityPrice();

const onChangeTypeHousing = (evt) => {
  const selectedIndex = evt.target.options.selectedIndex;
  const selectedValue = evt.target.options[selectedIndex].value;

  pricePerNight.placeholder = MinPriceByOfferType[selectedValue];
  priceMin = MinPriceByOfferType[selectedValue];

  onCheckValidityPrice();
};

const onChangeCapacity = (evt) => {
  const selectedIndexCapacity = evt.target.options.selectedIndex;
  const capacityCount = Number(evt.target.options[selectedIndexCapacity].value);
  const capacityText = evt.target.options[selectedIndexCapacity].text;
  const roomCount = Number(NumberOfRooms.options[NumberOfRooms.options.selectedIndex].value);

  if (roomCount < ROOMS_MAX && capacityCount > roomCount){
    showValidationMessage(numberOfSeats, getCapacityErrorMessage(capacityText, roomCount));
    return;
  } else if (roomCount < ROOMS_MAX && capacityCount === CAPACITY_NOT_FOR_GUEST) {
    showValidationMessage(numberOfSeats, getCapacityErrorMessage(capacityText, roomCount));
    return;
  } else if (roomCount === ROOMS_MAX && capacityCount !== CAPACITY_NOT_FOR_GUEST) {
    showValidationMessage(numberOfSeats, getCapacityErrorMessage(capacityText, roomCount));
    return;
  }
  hideValidationMessage(numberOfSeats);
};

const onChangeCheckInTime = (evt) => {
  checkOutTime.selectedIndex = evt.target.options.selectedIndex;
};
const onChangeCheckOutTime = (evt) => {
  checkInTime.selectedIndex = evt.target.options.selectedIndex;
};

const onChangeAddress = (lat, lng) => {
  housingAddress.value = `${lat.toFixed(DIGITS_COORDINATES)}, ${lng.toFixed(DIGITS_COORDINATES)}`;
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
  titleOffer.addEventListener('input', onInputTitle);
  pricePerNight.addEventListener('input', onInputPrice);
  typeOfHousing.addEventListener('change', onChangeTypeHousing);
  numberOfSeats.addEventListener('change', onChangeCapacity);

  checkInTime.addEventListener('change', onChangeCheckInTime);
  checkOutTime.addEventListener('change', onChangeCheckOutTime);

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
  formOffer,
  titleOffer,
  pricePerNight,
  numberOfSeats,
  housingAddress,
  onChangeAddress,
  setFormValidation,
  setMinPrice,
  isFormValid
};
