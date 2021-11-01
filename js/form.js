import {ElementsStatusClassNames} from './utils/const.js';
import {sendData} from './api.js';

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

export {toggleFormState, toggleFilterState, formSubmit};
// export {toggleFormState, toggleFilterState, formSubmit};
