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

import "../components/equalHeight"

import '../components/showFileTitle';

import '../components/dynamicLineHeight';

import '../components/googleAnalytics';

import '../components/limitedCharacterIndicator';

import '../components/inputSupMin';

import '../components/select2_relaunch';

import '../components/collapse_arrow';

// import '../components/copyLink';

import '../components/petitPlusEnter';

import '../components/filterMetier';

import '../TT_React/index.jsx';

import '../components/renderDate';

import '../components/customScrollBar';

import '../components/formContainerClass';

import { revealModal } from "../components/modal";
revealModal();

import { jobFilter } from "../components/job_choice";
jobFilter();

import { dynamicFormBar } from "../components/formprogression";
dynamicFormBar();

import { scrollToBottom } from "../components/scrollToBottom";
scrollToBottom();

import { checkBox } from "../components/check_box";
checkBox();

import { readMore } from '../components/readMore';
readMore();

import { readMoreText } from '../components/readMoreText';
readMoreText();

import { openOnglet } from '../components/toggableVerticalTabs';
openOnglet();

import { verifDateWithMonthAndYear } from '../components/verifDate';
verifDateWithMonthAndYear();

import { initSelect2, initSelectize } from '../components/select2';
initSelect2()
initSelectize()

import { initAutocomplete } from '../components/init_autocomplete';
initAutocomplete();

import { initMapbox } from '../plugins/map';
initMapbox();
