function autocomplete() {
  document.addEventListener("DOMContentLoaded", function() {
    var startupAddress = document.getElementById('startup_address');
    var talentCity = document.getElementById('talent_city');
    if (startupAddress) {
      var autocomplete = new google.maps.places.Autocomplete(startupAddress, { types: [ 'geocode' ] });
      google.maps.event.addDomListener(startupAddress, 'keydown', function(e) {
        if (e.key === "Enter") {
          e.preventDefault(); // Do not submit the form on Enter.
        }
      });
    }
    if (talentCity) {
      var autocomplete = new google.maps.places.Autocomplete(talentCity, { types: [ 'geocode' ] });
      google.maps.event.addDomListener(talentCity, 'keydown', function(e) {
        if (e.key === "Enter") {
          e.preventDefault(); // Do not submit the form on Enter.
        }
      });
    }
  });
}

export { autocomplete };
