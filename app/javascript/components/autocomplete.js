function autocomplete() {
  document.addEventListener("DOMContentLoaded", function() {
    var startupAddress = document.getElementById('startup_address');

    if (startupAddress) {
      var autocomplete = new google.maps.places.Autocomplete(startupAddress, { types: [ 'geocode' ] });
      google.maps.event.addDomListener(startupAddress, 'keydown', function(e) {
        if (e.key === "Enter") {
          e.preventDefault(); // Do not submit the form on Enter.
        }
      });
    }
  });
}

export { autocomplete };
