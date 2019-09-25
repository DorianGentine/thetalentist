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
    const selectedAnswer = parseInt(e.target.value, 10);
    // const selectedAnswer = parseInt(e.target.dataset.select2Id, 10);
    console.log("selectedAnswer", selectedAnswer)

    // reset le deuxième domaine si le premier est changé pour le même
    let secondValue = document.getElementsByClassName('second-domaine')[0].value;
    if(selectedAnswer == secondValue){
      $(".second-domaine").val(null).trigger('change')
    }

    // disable l'option sélectionnée dans 1
    const options = document.getElementsByClassName('second-domaine')[0].getElementsByTagName('option');
    // console.log(ocument.getElementsByClassName('second-domaine')[0])
    for (var i = 0; i <= selectedAnswer + 20; i++) {
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
  console.log("yes", nomClass)
  let selectAndCreate = $('.selectAndCreate')
  if(nomClass){selectAndCreate = $(nomClass)}
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
