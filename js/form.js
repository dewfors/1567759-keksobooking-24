const toggleFormState = (isDisabled) => {
  const formOffer = document.querySelector('form[data-form-offer=form-access]');
  const formOfferFieldsets = formOffer.querySelectorAll('[data-form-offer=form-access]');

  const formFilter = document.querySelector('form[data-form-filters=form-access]');
  const formFilterFields = formFilter.querySelectorAll('[data-form-filters=form-access]');

  if (isDisabled) {
    formOffer.classList.add('ad-form--disabled');
    formFilter.classList.add('map__filters--disabled');
  } else {
    formOffer.classList.remove('ad-form--disabled');
    formFilter.classList.remove('map__filters--disabled');
  }

  formOfferFieldsets.forEach((fieldset) => {
    fieldset.disabled = isDisabled;
  });
  formFilterFields.forEach((fieldset) => {
    fieldset.disabled = isDisabled;
  });

};

const form = document.querySelector('form.ad-form');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const capacity = form.querySelector('#capacity');


const formSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (title.checkValidity() === false || price.checkValidity() === false || capacity.checkValidity() === false) {
      return null;
    }

  });
};

export {toggleFormState, formSubmit};
