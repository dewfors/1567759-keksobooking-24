import './similar-offers.js';
import {toggleFormState, toggleFilterState} from './form.js';
import './form-offer-validate.js';
import {form, title, price, capacity} from './form-offer-validate.js';
import {createMap, initSimilarMarkers} from './map.js';
import {onFailGetData} from './utils/util.js';
import {COUNT_SIMILSR_OFFERS} from './utils/const.js';
// import {initMap} from './map.js';
import {getData} from './api.js';


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
  getData(onSuccessGetData, onFailGetData);
};

createMap(onMapLoad);
