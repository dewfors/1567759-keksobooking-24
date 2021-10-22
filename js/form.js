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


export {toggleFormState};
