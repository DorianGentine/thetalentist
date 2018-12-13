function verifDateWithMonthAndYear(){

  const dates = document.querySelectorAll('.verifDateWithMonthAndYear')
  const date_regex = /^(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/ ;
  console.log(dates)
  if (dates.length > 0) {
    dates.forEach((date) => {
      date.addEventListener('change', function(){
        console.log(date)
        if(!(date_regex.test(date.value))){
          var alterText = "<p> Le format n'est pas valide (ex= 10-2015) </p>"
          date.insertAdjacentHTML( 'afterend', alterText );
        }

      })
    })
  }
  let testDate = (event) => {
  }
}


export { verifDateWithMonthAndYear }
