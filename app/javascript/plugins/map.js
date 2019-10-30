


import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const mapElement = document.getElementById('map');

const buildMap = (marker) => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [ marker.lng, marker.lat ],
    zoom: 9
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
      new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(map);
  });
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { zoom: 12 });
};

const initMapbox = () => {
  if (mapElement) {
    mapElement.style.height = mapElement.offsetWidth + "px"
    const markers = JSON.parse(mapElement.dataset.markers);
    const map = buildMap(markers[0]);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
    map.addControl(new mapboxgl.NavigationControl());
  }
};

export { initMapbox };
