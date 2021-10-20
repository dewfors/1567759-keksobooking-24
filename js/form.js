const disableForms = () => {
  const formOffer = document.querySelector('form[data-form-offer=form-access]');
  const formOfferFieldsets = formOffer.querySelectorAll('[data-form-offer=form-access]');

  formOffer.classList.add('ad-form--disabled');
  formOfferFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  const formFilter = document.querySelector('form[data-form-filters=form-access]');
  const formFilterFields = formFilter.querySelectorAll('[data-form-filters=form-access]');

  formFilter.classList.add('map__filters--disabled');
  formFilterFields.forEach((fieldset) => {
    fieldset.disabled = true;
  });

};

const enableForms = () => {
  const formOffer = document.querySelector('form[data-form-offer=form-access]');
  const formOfferFieldsets = formOffer.querySelectorAll('[data-form-offer=form-access]');

  formOffer.classList.remove('ad-form--disabled');
  formOfferFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  const formFilter = document.querySelector('form[data-form-filters=form-access]');
  const formFilterFields = formFilter.querySelectorAll('[data-form-filters=form-access]');

  formFilter.classList.remove('map__filters--disabled');
  formFilterFields.forEach((fieldset) => {
    fieldset.disabled = false;
  });

};

export {disableForms, enableForms};
