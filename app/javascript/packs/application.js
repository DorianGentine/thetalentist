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

import '../components/popup_connexion';

import '../components/filterMetier';

import { autocomplete } from '../components/autocomplete';
autocomplete();

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

import { fetchNotifications } from "../components/notification";
fetchNotifications();


import { initAutocomplete } from '../components/init_autocomplete';
initAutocomplete();

import { initMapbox } from '../plugins/map';
initMapbox();
