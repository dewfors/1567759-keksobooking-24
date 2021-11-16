import {ElementsStates, DIGITS_COORDINATES} from './utils/const.js';
import {sendData} from './api.js';
import {resetMap, getMainMarker, initSimilarMarkers, removeSimilarMarkers} from './map.js';
import {housingAddressElement, setMinPrice, isFormValid} from './form-offer-validate.js';

const FILTER_DEFAULT_VALUE = 'any';
const Price = {
  MIN: 10000,
  MAX: 50000,
};
const PriceScale = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const formOfferElement = document.querySelector('form[data-form-offer=form-access]');
const formFilterElement = document.querySelector('form[data-form-filters=form-access]');
const typeHousingElement = formFilterElement.querySelector('#housing-type');
const priceElement = formFilterElement.querySelector('#housing-price');
const numberRoomsElement =  formFilterElement.querySelector('#housing-rooms');
const numberGuestsElement =  formFilterElement.querySelector('#housing-guests');
const featuresElements = formFilterElement.querySelectorAll('.map__checkbox');

const toggleElementsState = (anyForm, isActive) => {
  [...anyForm.children].forEach((fieldset) => fieldset.disabled = !isActive);
};

const toggleFormState = (isActive = true) => {
  toggleElementsState(formOfferElement, isActive);
  if (isActive) {
    formOfferElement.classList.remove(ElementsStates.formDisabled);
    return;
  }
  formOfferElement.classList.add(ElementsStates.formDisabled);
};

const toggleFilterState = (isActive = true) => {
  toggleElementsState(formFilterElement, isActive);
  if (isActive) {
    formFilterElement.classList.remove(ElementsStates.filtersDisabled);
    return;
  }
  formFilterElement.classList.add(ElementsStates.filtersDisabled);
};

const formSubmit = (onSuccess, onError) => {
  formOfferElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!isFormValid()) {
      return;
    }

    sendData(
      onSuccess,
      onError,
      new FormData(evt.target),
    );
  });
};

const compareByType = (filterType, offerType) => filterType === FILTER_DEFAULT_VALUE ? true : filterType === offerType;
const compareByRoomsOrGuests = (filterValue, offerValue) => filterValue === FILTER_DEFAULT_VALUE ? true : Number(filterValue) === offerValue;

const compareByPrice = (value, price) => {
  switch (value) {
    case PriceScale.LOW:
      return price <= Price.MIN;
    case PriceScale.MIDDLE:
      return price >= Price.MIN && price <= Price.MAX;
    case PriceScale.HIGH:
      return price >= Price.MAX;
    default:
      return true;
  }
};

const compareByFeatures = (filterFeatures, offerFeatures) => {
  if (!offerFeatures && filterFeatures.length > 0) { return false; }
  if (filterFeatures.length === 0) { return true; }

  for (let i = 0; i < filterFeatures.length; i++) {
    const isExistFeature = offerFeatures.some((feature) => feature === filterFeatures[i]);
    if (!isExistFeature) { return false; }
  }
  return true;
};

const getFiltredOffers = (offers) => {
  const filterFeatures = [...featuresElements]
    .filter((featute) => featute.checked)
    .map((featute) => featute.value);

  const filtredOffers = offers.slice()
    .filter(
      ({offer}) => compareByType(typeHousingElement.value, offer.type) &&
        compareByRoomsOrGuests(numberRoomsElement.value, offer.rooms) &&
        compareByRoomsOrGuests(numberGuestsElement.value, offer.guests) &&
        compareByPrice(priceElement.value, offer.price) &&
        compareByFeatures(filterFeatures, offer.features),
    );

  removeSimilarMarkers();
  initSimilarMarkers(filtredOffers);
};

const setFilterChange = (callback) => {
  formFilterElement.addEventListener('change', () => {
    callback();
  });
};

const formReset = () => {
  resetMap();
  formOfferElement.reset();
  formFilterElement.reset();
  setTimeout(() => {
    housingAddressElement.value = `${getMainMarker().lat.toFixed(DIGITS_COORDINATES)}, ${getMainMarker().lng.toFixed(DIGITS_COORDINATES)}`;
    setMinPrice();
  });
};

export {toggleFormState, toggleFilterState, formSubmit, formReset, getFiltredOffers, setFilterChange};
