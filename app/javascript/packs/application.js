/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import '../components/select2';

import '../components/googleAnalytics';

import '../components/limitedCharacterIndicator';

import '../components/inputSupMin';

import '../components/select2_relaunch';

import '../components/filterMetier';

import '../TT_React/index.jsx';

import '../components/renderDate';

import '../components/formContainerClass';

import '../components/validationInscriptionTalent';

import '../components/setJobColor';

import '../components/valuesToSendFilter';

import { openOnglet } from '../components/toggableVerticalTabs';
openOnglet();

import { initSelect2, initSelectize } from '../components/select2';
initSelect2()
initSelectize()

import { initAutocomplete } from '../components/init_autocomplete';
initAutocomplete();

import { initMapbox } from '../plugins/map';
initMapbox();
