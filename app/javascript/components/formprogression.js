function dynamicFormBar() {


  let currentContainer = document.querySelector('.form-container')
  let currentPage = currentContainer.dataset.page
  if (currentPage) {

    let items = document.querySelectorAll('.form-progression-item')
    items.forEach(function(item){
      if(item.getAttribute('id') < currentPage) {
        item.classList.add('progression-past')
      } else if (item.getAttribute('id') > currentPage) {
        item.classList.add('progression-next')
      }
    })

  }


}

export { dynamicFormBar }
