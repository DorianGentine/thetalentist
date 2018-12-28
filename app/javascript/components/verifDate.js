function verifDateWithMonthAndYear(){

  var dateModules = document.querySelectorAll(".date_module")
  const date_regex = /^(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/ ;
  dateModules.forEach((dateModule) => {
    console.log("Là")
    var dates = dateModule.querySelectorAll('.verifDateWithMonthAndYear')
    if (dates.length > 0) {
      dates.forEach((date) => {
        date.addEventListener('change', function(){
          var helpMessage = dateModule.querySelector("#helpMessageDate")
          if(date_regex.test(date.value) || date.value == ""){
            if(helpMessage){
              dateModule.removeChild(helpMessage)
            }
          } else if(!(date_regex.test(date.value))){
            var alterText = "<p class='col-xs-12' id='helpMessageDate'> Le format n'est pas valide (ex= 10-2015) </p>"
            if(!helpMessage){
              dateModule.insertAdjacentHTML('beforeend', alterText );
            }
          }
        })
      })
    }
  })
}

if(document.getElementById("add_experience")){
  document.getElementById("add_experience").addEventListener("click", function(){
    setTimeout(verifDateWithMonthAndYear, 1000)
  })
}

export { verifDateWithMonthAndYear }
