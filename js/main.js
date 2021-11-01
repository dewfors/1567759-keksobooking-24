import './similar-offers.js';
import {toggleFormState, toggleFilterState, formSubmit} from './form.js';
import './form-offer-validate.js';
// import {form, title, price, capacity} from './form-offer-validate.js';
import {createMap, initSimilarMarkers} from './map.js';
import {onFailNotice, onSuccessNotice, onErrorNotice} from './utils/util.js';
import {COUNT_SIMILSR_OFFERS} from './utils/const.js';
// import {initMap} from './map.js';
import {getData} from './api.js';
import {setFormValidation} from './form-offer-validate.js';


// const offers = createObjects();
toggleFormState(false);
toggleFilterState(false);

// formSubmit(form, title, price, capacity);

// initMap();

const onSuccessGetData = (data) => {
  initSimilarMarkers(data.slice(0, COUNT_SIMILSR_OFFERS));
  toggleFilterState(true);
};

const onMapLoad = () => {
  toggleFormState(true);
  setFormValidation();
  formSubmit(
    () => {
      onSuccessNotice();
    },
    onErrorNotice,
  );
  getData(onSuccessGetData, onFailNotice);
};

createMap(onMapLoad);
