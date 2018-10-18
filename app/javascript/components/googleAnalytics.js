jQuery(".inscriretalent").click(function() {
    console.log('inscriretalent button clicked');
  ga('send', 'event', 'consultation', 'click', 'inscriretalent')

});



jQuery( ".modifierstartup" ).click(function() {
  console.log('modifierstartup button clicked');
    ga('send', 'pageview', '/souscription-bulletin/bulletin-non-rempli');

});
