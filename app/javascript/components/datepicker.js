const data = document.querySelector('.datepicker1')
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css" // Note this is important!

// install yarn add flatpickr et suivre les infos https://flatpickr.js.org/
function onMonthOrYearChange(dObj, dStr, fp) {
  fp.setDate(new Date(fp.currentYear, fp.currentMonth));
}

if (data) {

  flatpickr(".datepicker1", {
     dateFormat: "M - Y",
     onYearChange: onMonthOrYearChange,
    onMonthChange: onMonthOrYearChange
  });
}



