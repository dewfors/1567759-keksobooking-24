import {toggleFormState} from './form.js';
import {CITY_INFO} from './utils/const.js';

toggleFormState(true);

const onMapLoad = () => {
  toggleFormState(false);
};

const map = L.map('map-canvas')
  .on('load', onMapLoad)
  .setView({
    lat: CITY_INFO.LOCATION.LAT,
    lng: CITY_INFO.LOCATION.LNG,
  }, CITY_INFO.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

