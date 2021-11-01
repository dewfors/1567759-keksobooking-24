import './similar-offers.js';
import {toggleFormState, toggleFilterState, formSubmit} from './form.js';
import './form-offer-validate.js';
import {createMap, initSimilarMarkers} from './map.js';
import {onFailNotice, onSuccessNotice, onErrorNotice} from './utils/util.js';
import {COUNT_SIMILSR_OFFERS} from './utils/const.js';
import {getData} from './api.js';
import {setFormValidation} from './form-offer-validate.js';

toggleFormState(false);
toggleFilterState(false);

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
