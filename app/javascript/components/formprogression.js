function dynamicFormBar() {
  let currentContainer = document.querySelector('.form-container')
  if (currentContainer) {
    let currentPage = currentContainer.dataset.page

    let items = document.querySelectorAll('.form-progression-item')
    items.forEach(function(item){
      if(item.getAttribute('id') < currentPage) {
        item.classList.add('progression-past')
        item.classList.add('hidden-xs')
      } else if (item.getAttribute('id') > currentPage) {
        item.classList.add('progression-next')
        item.classList.add('hidden-xs')
      }
    })
  }
}

export { dynamicFormBar }
