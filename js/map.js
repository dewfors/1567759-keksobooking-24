import {CITY_INFO, MARKER, COUNT_SIMILSR_OFFERS} from './utils/const.js';
import {onChangeAddress} from './form-offer-validate.js';
import {createCardList} from './similar-offers.js';

let map = null;
let markerGroup = null;

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

const resetMap = () => {
  map.closePopup();
  map.setView({
    lat: CITY_INFO.LOCATION.LAT,
    lng: CITY_INFO.LOCATION.LNG,
  }, CITY_INFO.ZOOM);
  mainMarker.setLatLng({
    lat: CITY_INFO.LOCATION.LAT,
    lng: CITY_INFO.LOCATION.LNG,
  });
};

const initSimilarMarkers = (data) => {
  const offers = data.slice(0, COUNT_SIMILSR_OFFERS);
  const cardList = createCardList(offers);

  markerGroup = L.layerGroup().addTo(map);

  offers.forEach((item, index) => {
    const {lat, lng} = item.location;
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
      .addTo(markerGroup)
      .bindPopup(cardList[index]);
  });
};
const removeSimilarMarkers = () => {
  markerGroup.clearLayers();
};

const getMainMarker = () => mainMarker.getLatLng();

export {createMap, resetMap, initSimilarMarkers, removeSimilarMarkers, getMainMarker};
