//= require rails-ujs
//= require_tree .
//= require turbolinks
//= require jquery



// fonction pour ajouter ou supprimer le formulaire experience dans le steps_talent_infos


$(document).on('turbolinks:load', function() {
  console.log("turbolinks is ready")
  $('form').on('click', '.remove_record', function(event) {
    $(this).prev('input[type=hidden]').val('1');
    $(this).closest('tr').hide();
    return event.preventDefault();
  });

  $('form').on('click', '.add_fields', function(event) {
    var regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');
    $('.fields').append($(this).data('fields').replace(regexp, time));
    return event.preventDefault();
  });
});



