import "bootstrap";

import '../components/select2';

import "../components/equalHeight"

import '../components/datepicker';

import '../components/showFileTitle';

import '../components/blockRotation';


import { autocomplete } from '../components/autocomplete';
autocomplete();

import { init_select2, addSelect2 } from '../components/addSelect2';
init_select2();
addSelect2();

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


import { scrollMessagesIntoView } from "../components/check_box";
scrollMessagesIntoView();
