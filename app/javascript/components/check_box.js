function checkBox(){
  const date_end = document.getElementById('to_experience')
  const currently = document.getElementById('currently_checked')
  if (currently) {
    currently.addEventListener('change', function(){
      if (this.checked){
        date_end.classList.add('checked_boxe');
      } else {
        date_end.classList.remove('checked_boxe');
      };
    })
  }
};

export {checkBox}
