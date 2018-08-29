import "bootstrap";

import '../components/select2';

import '../components/datepicker';

import { addFields } from "../components/addField";
addFields();

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
