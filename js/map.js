import {CITY_INFO, MARKER} from './utils/const.js';
import {onChangeAddress} from './form-offer-validate.js';
import {createCardList} from './similar-offers.js';

let map = null;

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

const mainMarker = L.marker(
  {
    lat: CITY_INFO.LOCATION.LAT,
    lng: CITY_INFO.LOCATION.LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const onMarkerMove = () => {
  const {lat, lng} = mainMarker.getLatLng();
  onChangeAddress(lat, lng);
};

const createMap = (cb) => {
  map = L.map('map-canvas')
    .on('load', cb)
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

  onMarkerMove();
  mainMarker.on('move', onMarkerMove);
  mainMarker.addTo(map);
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

const initSimilarMarkers = (data) => {
  const cardList = createCardList(data);

  data.forEach((item, index) => {
    const {lat, lng} = item.location;
    createMarker(lat, lng, cardList[index]);
  });
};

export {createMap, initSimilarMarkers};
