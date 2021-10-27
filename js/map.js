import {toggleFormState} from './form.js';
import {CITY_INFO, MARKER} from './utils/const.js';
import {onChangeAddress} from './form-offer-validate.js';

toggleFormState(true);

const onMapLoad = () => {
  console.log('карта инициализирована');
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

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: MARKER.MAIN.getSize(),
  iconAnchor: MARKER.MAIN.getAnchor(),
});

const defaultMarkerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: MARKER.DEFAULT.getSize(),
  iconAnchor: MARKER.DEFAULT.getAnchor(),
});

const createMainMarker = (markerLat, markerLng) => {
  const marker = L.marker(
    {
      lat: markerLat,
      lng: markerLng,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  ).addTo(map);

  const onMarkerMove = () => {
    const {lat, lng} = marker.getLatLng();
    onChangeAddress(lat, lng);
  };

  onMarkerMove();
  marker.on('move', onMarkerMove);
};

const createMarker = (lat, lng) => {
  L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: false,
      icon: defaultMarkerIcon,
    },
  ).addTo(map);
};

const initMap = () => {
  createMainMarker(CITY_INFO.LOCATION.LAT, CITY_INFO.LOCATION.LNG);
};

export {initMap};

