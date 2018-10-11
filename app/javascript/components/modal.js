function revealModal() {
  let triggerModal = (event) => {
    let targetModalID = event.currentTarget.dataset.target
    let targetModal = document.getElementById(targetModalID)

    targetModal.style.display = "block";

    console.log(targetModalID)
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
  }

  let modalButtonsList = document.querySelectorAll('.modal-button')
  modalButtonsList.forEach((button) => {
    console.log(button)
    button.addEventListener("click", triggerModal);
  })

}


export { revealModal }

