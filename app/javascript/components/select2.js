import $ from 'jquery';
import 'select2';
import 'selectize';

const initSelect2 = () => {
  $('.select2').select2();

  // supprime la search-box (ajouter la class no-search)
  $('.no-search').select2({
    minimumResultsForSearch: -1
  });

  $(".domaine-change-placeholder").select2({
    minimumResultsForSearch: -1,
    placeholder: "Domaine d'activité"
  });
};




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

$('.selectizeTwo').selectize({
  plugins: ['remove_button'],
  delimiter: ',',
  maxItems: 2
});




// Requiring CSS! Path is relative to ./node_modules
import 'select2/dist/css/select2.css';
import 'selectize/dist/css/selectize.css';

export { initSelect2 }
