function revealModal() {
  let triggerModal = (event) => {
    let targetModalID = event.currentTarget.dataset.target
    let targetModal = document.getElementById(targetModalID)

    targetModal.style.display = "block";

    // console.log(targetModalID)
    let close = "close_" + targetModalID
    let span = document.getElementById(close);
    span.onclick = function() {
      targetModal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == targetModal) {
        targetModal.style.display = "none";
      }
    }

    window.onkeydown = function(event){
      if (event.keyCode == 27 && targetModal.style.display == "block") {
        targetModal.style.display = "none";
      }
    };


    // heights for formation repertoire talents
    const formations = targetModal.querySelectorAll('.talent-school-item')
    let maxHeight = 0
    formations.forEach((formation) => {
      if (maxHeight < formation.offsetHeight) {
        maxHeight = formation.offsetHeight
      }
    })
    formations.forEach((formation) => {formation.style.height = maxHeight + "px"})
  }

  let modalButtonsList = document.querySelectorAll('.modal-button')
  modalButtonsList.forEach((button) => {
    button.addEventListener("click", triggerModal);
  })

}


export { revealModal }
