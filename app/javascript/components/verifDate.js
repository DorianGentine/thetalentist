function verifDateWithMonthAndYear(){

  var dateModules = document.querySelectorAll(".date_module")
  const date_regex = /^(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/ ;
  dateModules.forEach((dateModule) => {

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
            var alterText = "<p class='col-xs-12' id='helpMessageDate' style='color:red; font-size: 14px;'> Le format <strong style='color:red;'>" + date.value + "</strong> n'est pas valide (ex= 10-2015) </p>"
            if(!helpMessage){
              dateModule.insertAdjacentHTML('beforeend', alterText );
            }
            // return date.value = null
          }
        })
        date.addEventListener('keyup', function(){
          const val = date.value
          if (event.key === "Backspace" && date.value.length === 2) {
            date.value = val.substr(0,1)
          }else if (date.value.length === 2) {
            date.value = val + "-"
          }else if (date.value.length >= 7) {
            if (event.key != "Shift" & event.key != "Backspace" ) {
              date.value = val.substr(0,7)
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
