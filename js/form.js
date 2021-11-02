import {ElementsStatusClassNames, DIGITS_COORDINATES} from './utils/const.js';
import {sendData} from './api.js';
import {resetMap, getMainMarker, initSimilarMarkers, removeSimilarMarkers} from './map.js';
import {address, setMinPrice} from './form-offer-validate.js';

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
    form.classList.remove(ElementsStatusClassNames.formDisabled);
    return;
  }
  form.classList.add(ElementsStatusClassNames.formDisabled);
};

const toggleFilterState = (isActive = true) => {
  toggleElementsState(filter, isActive);
  if (isActive) {
    filter.classList.remove(ElementsStatusClassNames.filtersDisabled);
    return;
  }
  filter.classList.add(ElementsStatusClassNames.filtersDisabled);
};

const formSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

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

const getFiltredOffers = (offers) => {
  const features = [...filterOffersFeatures]
    .filter((featute) => featute.checked)
    .map((featute) => featute.value);
  console.log(features);

  const filtredOffers = offers.slice()
    .filter(
      ({offer}) => compareByType(filterOfferType.value, offer.type) &&
        compareByRoomsOrGuests(filterOfferRooms.value, offer.rooms) &&
        compareByRoomsOrGuests(filterOfferGuests.value, offer.guests) ,
    );
  console.log(filtredOffers);

  removeSimilarMarkers();
  initSimilarMarkers(filtredOffers);

};

const setFilterChange = (callback) => {

  console.log(callback);

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
