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
    let selectedAnswer = parseInt(e.target.value, 10);
    console.log("selectedAnswer", selectedAnswer)

    // reset le deuxième domaine si le premier est changé pour le même
    let secondValue = document.getElementsByClassName('second-domaine')[0].value;
    if(selectedAnswer == secondValue){
      $(".second-domaine").val(null).trigger('change')
    }

    // disable l'option sélectionnée dans 1
    const options = document.getElementsByClassName('second-domaine')[0].getElementsByTagName('option');

    // adapte selectedAnswer en prod
    const valueFirstJob = document.getElementsByClassName('premier-domaine')[0].getElementsByTagName('option')[1].value
    const nbJobs = document.getElementsByClassName('premier-domaine')[0].getElementsByTagName('option').length - 1
    const valueLastJob = document.getElementsByClassName('premier-domaine')[0].getElementsByTagName('option')[nbJobs].value
    const nbIds = valueLastJob - valueFirstJob + 1

    console.log('valueFirstJob', valueFirstJob)
    selectedAnswer = selectedAnswer - valueFirstJob + 1
    console.log("selectedAnswer", selectedAnswer)

    for (var i = 0; i <= selectedAnswer + nbIds; i++) {
      if(options[i] != undefined){
        options[i].disabled = false
        if(i == selectedAnswer){
          console.log("disabled")
          options[i].setAttribute("disabled", true)
        }
      }
    }

    // relance le render select2 pour MAJ des données
    $(".second-domaine").select2({
      minimumResultsForSearch: -1,
      allowClear: true,
      placeholder: "secondaire (facultatif)"
    });

  });



const initSelectize = (nomClass) => {
  let selectAndCreate = $('.selectAndCreate')
  if(nomClass){selectAndCreate = $(nomClass)}
  selectAndCreate.selectize({
    plugins: ['remove_button'],
    delimiter: ',',
    persist: false,
    maxItems: '1',
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
    onDropdownOpen: function ($dropdown) {
      // Manually prevent dropdown from opening when there is no search term
      if (!this.lastQuery.length) {
        this.close();
      }
    },
    onType: function (str) {
      if (str === "") {
          this.close();
      }
    },
  });

  if(nomClass == undefined){
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
}

export { initSelect2, initSelectize }
