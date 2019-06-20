const collapse = document.getElementsByClassName('collapse-fleche')
if(collapse){
  for (var i = collapse.length - 1; i >= 0; i--) {
    const arrow = collapse[i].getElementsByTagName('I')[0]
    collapse[i].addEventListener("click", ()=>{
      arrow.classList.toggle('fa-chevron-up')
    })
  }
}
