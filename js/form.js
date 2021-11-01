import {ElementsStatusClassNames, DIGITS_COORDINATES} from './utils/const.js';
import {sendData} from './api.js';
import {resetMap, getMainMarker} from './map.js';
import {address, setMinPrice} from './form-offer-validate.js';

const form = document.querySelector('form[data-form-offer=form-access]');
const filter = document.querySelector('form[data-form-filters=form-access]');

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

const formReset = () => {
  resetMap();
  form.reset();
  filter.reset();
  setTimeout(() => {
    address.value = `${getMainMarker().lat.toFixed(DIGITS_COORDINATES)}, ${getMainMarker().lng.toFixed(DIGITS_COORDINATES)}`;
    setMinPrice();
  });
};

export {toggleFormState, toggleFilterState, formSubmit, formReset};
