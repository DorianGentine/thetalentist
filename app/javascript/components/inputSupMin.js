var numberSupZero = document.getElementsByClassName("sup-zero");

if (numberSupZero) {
  for (var i = 0; i < numberSupZero.length ; i++) {

    numberSupZero[i].addEventListener("blur", function(e) {
      var inputMin = e.target.min;
      var inputMax = e.target.max;
      var inputValue = e.target.value;
      if (inputValue < inputMin) {
        e.target.value = 0;
      }
      if (inputValue > inputMax){
        e.target.value = inputMax;
      }
    })
  }
}
