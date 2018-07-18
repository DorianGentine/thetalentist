const data = document.querySelector('.datepicker1')
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css" // Note this is important!

// install yarn add flatpickr et suivre les infos https://flatpickr.js.org/

if (data) {

  flatpickr(".datepicker1", {
     dateFormat: "d M - Y",

  });
}
