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
const formOfferElement = document.querySelector(ElementsSelectors.formOffer);
const titleOfferElement = formOfferElement.querySelector(ElementsSelectors.formTitle);
const pricePerNightElement = formOfferElement.querySelector(ElementsSelectors.formPrice);
const typeOfHousingElement = formOfferElement.querySelector(ElementsSelectors.formType);
const NumberOfRoomsElement = formOfferElement.querySelector(ElementsSelectors.formRoomNumber);
const numberOfSeatsElement = formOfferElement.querySelector(ElementsSelectors.formCapacity);
const checkInTimeElement = formOfferElement.querySelector(ElementsSelectors.formTimeIn);
const checkOutTimeElement = formOfferElement.querySelector(ElementsSelectors.formTimeOut);
const housingAddressElement = formOfferElement.querySelector(ElementsSelectors.formAddress);
const buttonSubmit = formOfferElement.querySelector(ElementsSelectors.buttonSubmit);
const buttonReset = formOfferElement.querySelector(ElementsSelectors.buttonReset);
const checkLengthTitle = (value, minLength, maxLength) => value.length >= minLength && value.length <= maxLength;
const getPriceErrorMessage = () => `Цена должна быть от ${priceMin} до ${PRICE_MAX}`;
const checkLengthPrice = (value, min, max) => value >= min && value <= max;
const getCapacityErrorMessage = (capacityText, roomCount) => `${roomCount} комната(ы) не подходит ${capacityText}`;

const formValidationFields = [titleOfferElement, pricePerNightElement, numberOfSeatsElement];
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
  if (!checkLengthTitle(titleOfferElement.value, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)) {
    showValidationMessage(titleOfferElement, TITLE_LENGTH_ERROR_MESSAGE);
    return;
  }
  hideValidationMessage(titleOfferElement);
};

const onCheckValidityPrice = () => {
  if (!checkLengthPrice(pricePerNightElement.value, priceMin, PRICE_MAX)) {
    showValidationMessage(pricePerNightElement, getPriceErrorMessage());
    return;
  }
  hideValidationMessage(pricePerNightElement);
};

const setMinPrice = () => {
  pricePerNightElement.placeholder = MinPriceByOfferType[typeOfHousingElement.options[typeOfHousingElement.options.selectedIndex].value];
};

const onInputTitle = () => onCheckValidityTitle();
const onInputPrice = () => onCheckValidityPrice();

const onChangeTypeHousing = (evt) => {
  const selectedIndex = evt.target.options.selectedIndex;
  const selectedValue = evt.target.options[selectedIndex].value;

  pricePerNightElement.placeholder = MinPriceByOfferType[selectedValue];
  priceMin = MinPriceByOfferType[selectedValue];

  onCheckValidityPrice();
};

const onChangeCapacity = (evt) => {
  const selectedIndexCapacity = evt.target.options.selectedIndex;
  const capacityCount = Number(evt.target.options[selectedIndexCapacity].value);
  const capacityText = evt.target.options[selectedIndexCapacity].text;
  const roomCount = Number(NumberOfRoomsElement.options[NumberOfRoomsElement.options.selectedIndex].value);

  if (roomCount < ROOMS_MAX && capacityCount > roomCount){
    showValidationMessage(numberOfSeatsElement, getCapacityErrorMessage(capacityText, roomCount));
    return;
  } else if (roomCount < ROOMS_MAX && capacityCount === CAPACITY_NOT_FOR_GUEST) {
    showValidationMessage(numberOfSeatsElement, getCapacityErrorMessage(capacityText, roomCount));
    return;
  } else if (roomCount === ROOMS_MAX && capacityCount !== CAPACITY_NOT_FOR_GUEST) {
    showValidationMessage(numberOfSeatsElement, getCapacityErrorMessage(capacityText, roomCount));
    return;
  }
  hideValidationMessage(numberOfSeatsElement);
};

const onChangeCheckInTime = (evt) => {
  checkOutTimeElement.selectedIndex = evt.target.options.selectedIndex;
};
const onChangeCheckOutTime = (evt) => {
  checkInTimeElement.selectedIndex = evt.target.options.selectedIndex;
};

const onChangeAddress = (lat, lng) => {
  housingAddressElement.value = `${lat.toFixed(DIGITS_COORDINATES)}, ${lng.toFixed(DIGITS_COORDINATES)}`;
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
  titleOfferElement.addEventListener('input', onInputTitle);
  pricePerNightElement.addEventListener('input', onInputPrice);
  typeOfHousingElement.addEventListener('change', onChangeTypeHousing);
  numberOfSeatsElement.addEventListener('change', onChangeCapacity);

  checkInTimeElement.addEventListener('change', onChangeCheckInTime);
  checkOutTimeElement.addEventListener('change', onChangeCheckOutTime);

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
  formOfferElement,
  titleOfferElement,
  pricePerNightElement,
  numberOfSeatsElement,
  housingAddressElement,
  onChangeAddress,
  setFormValidation,
  setMinPrice,
  isFormValid
};
