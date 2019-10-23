/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 122);
/******/ })
/************************************************************************/
/******/ ({

/***/ 122:
/*!*************************************!*\
  !*** ./app/javascript/packs/map.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// A supprimer si après le 01/2020 toujours pas utilisé

// import GMaps from 'gmaps/gmaps.js';

// const mapElement = document.getElementById('map');
// if (mapElement) { // don't try to build a map if there's no div#map to inject in
// mapElement.style.height = mapElement.offsetWidth + "px"

// const map = new GMaps({ el: '#map', lat: 0, lng: 0 });
// const markers = JSON.parse(mapElement.dataset.markers);
// map.addMarkers(markers);
// if (markers.length === 0) {
//   map.setZoom(12);
// } else if (markers.length === 1) {
//   map.setCenter(markers[0].lat, markers[0].lng);
//   map.setZoom(14);
// } else {
//   // map.fitLatLngBounds(markers);
//   map.setCenter(markers[0].lat, markers[0].lng);
//   map.setZoom(14);

// }
// }


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

/***/ })

/******/ });
//# sourceMappingURL=map-17f870b102574f6f842d.js.map