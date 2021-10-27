import {ElementsStatusClassNames} from './utils/const.js';

const toggleFormState = (isDisabled = true) => {
  const formOffer = document.querySelector('form[data-form-offer=form-access]');
  const formOfferFieldsets = formOffer.children;

  const formFilter = document.querySelector('form[data-form-filters=form-access]');
  const formFilterFields = formFilter.children;

  if (isDisabled) {
    formOffer.classList.add(ElementsStatusClassNames.formDisabled);
    formFilter.classList.add(ElementsStatusClassNames.filtersDisabled);
  } else {
    formOffer.classList.remove(ElementsStatusClassNames.formDisabled);
    formFilter.classList.remove(ElementsStatusClassNames.filtersDisabled);
  }

  [...formOfferFieldsets, ...formFilterFields].forEach((fieldset) => fieldset.disabled = isDisabled);
};

const formSubmit = (form, title, price, capacity) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!title.checkValidity() || !price.checkValidity() || !capacity.checkValidity()) {
      return null;
    }

  });
};

export {toggleFormState, formSubmit};
