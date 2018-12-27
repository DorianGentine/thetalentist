import $ from 'jquery';
import 'select2';
import 'selectize';

$('.select2').select2(

);

$('.no-search').select2({
  minimumResultsForSearch: -1
});


$('.selectAndCreate').selectize({
  plugins: ['remove_button'],
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


