import GMaps from 'gmaps/gmaps.js';

const mapElement = document.getElementById('map');
if (mapElement) { // don't try to build a map if there's no div#map to inject in
  const map = new GMaps({ el: '#map', lat: 0, lng: 0 });
  const markers = JSON.parse(mapElement.dataset.markers);
  map.addMarkers(markers);
  if (markers.length === 0) {
    map.setZoom(12);
  } else if (markers.length === 1) {
    map.setCenter(markers[0].lat, markers[0].lng);
    map.setZoom(14);
  } else {
    // map.fitLatLngBounds(markers);
    map.setCenter(markers[0].lat, markers[0].lng);
    map.setZoom(14);

  }
}




// const map = document.getElementById("map_for_contact");

// if (map) {
//   $(document).ready(function() {
//     var uluru = {lat: 48.870129, lng: 48.870129};
//     handler = Gmaps.build('Google');
//     handler.buildMap({ internal: { id: 'map_for_contact' }}, function(){
//       markers = handler.addMarkers({
//           position: uluru
//         });
//     console.log(markers)
//       handler.bounds.extendWith(markers);
//       handler.fitMapToBounds();
//       handler.getMap().setZoom(13);
//     })
//   })

// }
