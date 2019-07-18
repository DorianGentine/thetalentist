import $ from 'jquery';
import 'select2';
import 'selectize';

const initSelect2 = () => {
  $('.select2').select2();

  // supprime la search-box (ajouter la class no-search)
  $('.no-search').select2({
    minimumResultsForSearch: -1
  });

  $(".premier-domaine").select2({
    minimumResultsForSearch: -1,
    placeholder: "principal"
  });
  $(".premier-domaine").on("change", function (e) {
    console.log("change", e.target.value);
    const selectedAnswer = e.target.value;
    const secondDomaine = $(".second-domaine")[0]
    console.log(secondDomaine.getElementByTagName('option'))
    $(".second-domaine").attr('disabled', true)
  });

  $(".second-domaine").select2({
    minimumResultsForSearch: -1,
    allowClear: true,
    placeholder: "secondaire (facultatif)"
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

$('.comp-cles').selectize({
  plugins: ['remove_button'],
  placeholder: 'Cherchez votre compétence',
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
// import 'select2/dist/css/select2.css';
// import 'selectize/dist/css/selectize.css';

export { initSelect2 }
