import {toggleFormState} from './form.js';
import {COUNT_SIMILSR_OFFERS, CITY_INFO, MARKER} from './utils/const.js';
import {onChangeAddress} from './form-offer-validate.js';
import {createCardList} from './similar-offers.js';
import {getData} from './api.js';

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

const createMarker = (lat, lng, popup) => {
  L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: false,
      icon: defaultMarkerIcon,
    },
  )
    .addTo(map)
    .bindPopup(popup);
};

const initMainMarker = () => {
  createMainMarker(CITY_INFO.LOCATION.LAT, CITY_INFO.LOCATION.LNG);
};

const initSimilarMarkers = (data) => {
  const cardList = createCardList(data);

  data.forEach((item, index) => {
    const {lat, lng} = item.location;
    createMarker(lat, lng, cardList[index]);
  });
};

const onSuccessGetData = (data) => {
  initSimilarMarkers(data.slice(0, COUNT_SIMILSR_OFFERS));
};

const onFailGetData = (message) => {
  const notice = document.createElement('div');
  notice.style.padding = '5px';
  notice.style.backgroundColor = 'red';
  notice.style.position = 'absolute';
  notice.style.top = '0';
  notice.style.left = '0';
  notice.style.right = '0';
  notice.style.color = 'white';
  notice.style.zIndex = '500';
  notice.style.fontSize = '13px';
  notice.style.textAlign = 'center';
  notice.textContent = message;
  document.querySelector('main').append(notice);

};


const initMap = (data) => {
  initMainMarker();

  getData(onSuccessGetData, onFailGetData);

};

export {initMap};

