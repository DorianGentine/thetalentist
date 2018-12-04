var numberSupZero = document.getElementsByClassName("sup-zero");

if (numberSupZero) {
  for (var i = 0; i < numberSupZero.length ; i++) {

    numberSupZero[i].addEventListener("blur", function(e) {
      var inputMin = Number(e.target.min);
      var inputMax = Number(e.target.max);
      var inputValue = Number(e.target.value);
      if (inputValue < inputMin) {
        e.target.value = inputMin;
      }
      if (inputValue > inputMax){
        e.target.value = inputMax;
      }
    })
  }
}
