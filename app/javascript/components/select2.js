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

  $(".second-domaine").select2({
    minimumResultsForSearch: -1,
    allowClear: true,
    placeholder: "secondaire (facultatif)"
  });
};

// Fonction domaines d'activité différents
  $(".premier-domaine").on("change", function (e) {
    console.log("launched")
    const selectedAnswer = parseInt(e.target.value, 10);
    console.log("selectedAnswer", selectedAnswer)

    // reset le deuxième domaine si le premier est changé pour le même
    let secondValue = document.getElementsByClassName('second-domaine')[0].value;
    console.log("secondValue", secondValue)
    if(selectedAnswer == secondValue){
      $(".second-domaine").val(null).trigger('change')
    }

    // disable l'option sélectionnée dans 1
    const options = document.getElementsByClassName('second-domaine')[0].getElementsByTagName('option');
    for (var i = options.length - 1; i >= 0; i--) {
      options[i].disabled = false
      if(i == selectedAnswer){
        options[i].setAttribute("disabled", true)
      }
    }

    // relance le render select2 pour MAJ des données
    $(".second-domaine").select2({
      minimumResultsForSearch: -1,
      allowClear: true,
      placeholder: "secondaire (facultatif)"
    });

  });



const initSelectize = () => {
  const selectAndCreate = $('.selectAndCreate')
  selectAndCreate.selectize({
    plugins: ['remove_button'],
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        value: input,
        text: input
      }
    },
    render: {
      option_create: function(data, escape) {
        let addString = 'Ajouter';
        return '<div class="create">' + addString + ' <strong>' + escape(data.input) + '</strong>&hellip;</div>';
      }
    },
  });

  $('.comp-cles').selectize({
    plugins: ['remove_button'],
    placeholder: 'Ajouter [...]',
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        value: input,
        text: input
      }
    },
    render: {
      option_create: function(data, escape) {
        let addString = 'Ajouter';
        return '<div class="create">' + addString + ' <strong>' + escape(data.input) + '</strong>&hellip;</div>';
      }
    },
  });

  $('.selectizeTwo').selectize({
    plugins: ['remove_button'],
    delimiter: ',',
    maxItems: 2
  });
}

export { initSelect2, initSelectize }
