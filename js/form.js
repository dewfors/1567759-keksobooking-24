import {ElementsStates, DIGITS_COORDINATES} from './utils/const.js';
import {sendData} from './api.js';
import {resetMap, getMainMarker, initSimilarMarkers, removeSimilarMarkers} from './map.js';
import {address, setMinPrice, isFormValid} from './form-offer-validate.js';

const form = document.querySelector('form[data-form-offer=form-access]');
const filter = document.querySelector('form[data-form-filters=form-access]');
const filterOfferType = filter.querySelector('#housing-type');
const filterOfferPrice = filter.querySelector('#housing-price');
const filterOfferRooms =  filter.querySelector('#housing-rooms');
const filterOfferGuests =  filter.querySelector('#housing-guests');
const filterOffersFeatures = filter.querySelectorAll('.map__checkbox');
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

const toggleElementsState = (anyForm, isActive) => {
  [...anyForm.children].forEach((fieldset) => fieldset.disabled = !isActive);
};

const toggleFormState = (isActive = true) => {
  toggleElementsState(form, isActive);
  if (isActive) {
    form.classList.remove(ElementsStates.formDisabled);
    return;
  }
  form.classList.add(ElementsStates.formDisabled);
};

const toggleFilterState = (isActive = true) => {
  toggleElementsState(filter, isActive);
  if (isActive) {
    filter.classList.remove(ElementsStates.filtersDisabled);
    return;
  }
  filter.classList.add(ElementsStates.filtersDisabled);
};

const formSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
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
  const filterFeatures = [...filterOffersFeatures]
    .filter((featute) => featute.checked)
    .map((featute) => featute.value);

  const filtredOffers = offers.slice()
    .filter(
      ({offer}) => compareByType(filterOfferType.value, offer.type) &&
        compareByRoomsOrGuests(filterOfferRooms.value, offer.rooms) &&
        compareByRoomsOrGuests(filterOfferGuests.value, offer.guests) &&
        compareByPrice(filterOfferPrice.value, offer.price) &&
        compareByFeatures(filterFeatures, offer.features),
    );

  removeSimilarMarkers();
  initSimilarMarkers(filtredOffers);
};

const setFilterChange = (callback) => {
  filter.addEventListener('change', () => {
    callback();
  });
};

const formReset = () => {
  resetMap();
  form.reset();
  filter.reset();
  setTimeout(() => {
    address.value = `${getMainMarker().lat.toFixed(DIGITS_COORDINATES)}, ${getMainMarker().lng.toFixed(DIGITS_COORDINATES)}`;
    setMinPrice();
  });
};

export {toggleFormState, toggleFilterState, formSubmit, formReset, getFiltredOffers, setFilterChange};
