import './similar-offers.js';
import {toggleFormState, toggleFilterState, formSubmit, getFiltredOffers, setFilterChange} from './form.js';
import './form-offer-validate.js';
import {createMap, initSimilarMarkers} from './map.js';
import {onFailNotice, onSuccessNotice, onErrorNotice} from './utils/util.js';
import {COUNT_SIMILSR_OFFERS} from './utils/const.js';
import {getData} from './api.js';
import {setFormValidation} from './form-offer-validate.js';
import {debounce} from './utils/debounce.js';

let initialOffers = null;

toggleFormState(false);
toggleFilterState(false);

const onSuccessGetData = (data) => {
  initialOffers = data.slice(0, COUNT_SIMILSR_OFFERS);
  initSimilarMarkers(initialOffers);
  toggleFilterState(true);

  setFilterChange(
    debounce(() => {
      getFiltredOffers(initialOffers);
    }));
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
