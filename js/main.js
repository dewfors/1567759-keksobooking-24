import './similar-offers.js';
import {toggleFormState, toggleFilterState, formSubmit, formReset, getFiltredOffers, setFilterChange} from './form.js';
import './form-offer-validate.js';
import {createMap, initSimilarMarkers} from './map.js';
import {onFailNotice, onSuccessNotice, onErrorNotice} from './utils/util.js';
import {COUNT_SIMILAR_OFFERS} from './utils/const.js';
import {getData} from './api.js';
import {setFormValidation} from './form-offer-validate.js';
import {debounce} from './utils/debounce.js';

let initialOffers = null;

toggleFormState(false);
toggleFilterState(false);

const onSuccessGetData = (data) => {
  initialOffers = data.slice();
  initSimilarMarkers(initialOffers.slice(0, COUNT_SIMILAR_OFFERS));
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
      formReset();
    },
    onErrorNotice,
  );
  getData(onSuccessGetData, onFailNotice);
};

createMap(onMapLoad);
