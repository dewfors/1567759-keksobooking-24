import {ElementsStates, DIGITS_COORDINATES} from './utils/const.js';
import {sendData} from './api.js';
import {resetMap, getMainMarker, initSimilarMarkers, removeSimilarMarkers} from './map.js';
import {housingAddress, setMinPrice, isFormValid} from './form-offer-validate.js';

const FILTER_DEFAULT_VALUE = 'any';

const formOffer = document.querySelector('form[data-form-offer=form-access]');
const formFilter = document.querySelector('form[data-form-filters=form-access]');
const typeHousingInFilter = formFilter.querySelector('#housing-type');
const priceInFilter = formFilter.querySelector('#housing-price');
const numberRoomsInFilter =  formFilter.querySelector('#housing-rooms');
const numberGuestsInFilter =  formFilter.querySelector('#housing-guests');
const featuresInFilter = formFilter.querySelectorAll('.map__checkbox');
const Price = {
  MIN: 10000,
  MAX: 50000,
};
const PriceScale = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const toggleElementsState = (anyForm, isActive) => {
  [...anyForm.children].forEach((fieldset) => fieldset.disabled = !isActive);
};

const toggleFormState = (isActive = true) => {
  toggleElementsState(formOffer, isActive);
  if (isActive) {
    formOffer.classList.remove(ElementsStates.formDisabled);
    return;
  }
  formOffer.classList.add(ElementsStates.formDisabled);
};

const toggleFilterState = (isActive = true) => {
  toggleElementsState(formFilter, isActive);
  if (isActive) {
    formFilter.classList.remove(ElementsStates.filtersDisabled);
    return;
  }
  formFilter.classList.add(ElementsStates.filtersDisabled);
};

const formSubmit = (onSuccess, onError) => {
  formOffer.addEventListener('submit', (evt) => {
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
  const filterFeatures = [...featuresInFilter]
    .filter((featute) => featute.checked)
    .map((featute) => featute.value);

  const filtredOffers = offers.slice()
    .filter(
      ({offer}) => compareByType(typeHousingInFilter.value, offer.type) &&
        compareByRoomsOrGuests(numberRoomsInFilter.value, offer.rooms) &&
        compareByRoomsOrGuests(numberGuestsInFilter.value, offer.guests) &&
        compareByPrice(priceInFilter.value, offer.price) &&
        compareByFeatures(filterFeatures, offer.features),
    );

  removeSimilarMarkers();
  initSimilarMarkers(filtredOffers);
};

const setFilterChange = (callback) => {
  formFilter.addEventListener('change', () => {
    callback();
  });
};

const formReset = () => {
  resetMap();
  formOffer.reset();
  formFilter.reset();
  setTimeout(() => {
    housingAddress.value = `${getMainMarker().lat.toFixed(DIGITS_COORDINATES)}, ${getMainMarker().lng.toFixed(DIGITS_COORDINATES)}`;
    setMinPrice();
  });
};

export {toggleFormState, toggleFilterState, formSubmit, formReset, getFiltredOffers, setFilterChange};
