function checkBox(){
  const date_ends = document.querySelectorAll('.to_experience')
  const currentlys = document.querySelectorAll('.currently_checked')
  if (currentlys) {
    currentlys.forEach((currently) => {
      currently.addEventListener('change', function(){
        var output = currently.id.replace('currently','');
        let year_id = output + "years"
        let date_end = document.getElementById(year_id)
        if (this.checked){
          date_end.classList.add('checked_boxe');
          date_end.value = null

        } else {
          date_end.classList.remove('checked_boxe');

        };
      })
    })
  }
};

export {checkBox}

