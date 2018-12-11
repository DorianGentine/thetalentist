import $ from 'jquery';
import 'select2';
import 'selectize';

$('.select2').select2(

  );

$('.selectAndCreate').selectize({
  plugins: ['restore_on_backspace'],
  delimiter: ',',
  persist: false,
  create: function(input) {
    return {
      value: input,
      text: input
    }
  }
});



// Requiring CSS! Path is relative to ./node_modules
import 'select2/dist/css/select2.css';
import 'selectize/dist/css/selectize.css';


