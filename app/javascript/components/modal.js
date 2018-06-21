function revealModal() {
  const triggerModal = (event) => {
    let targetModalID = event.currentTarget.dataset.target
    let targetModal = document.getElementById(targetModalID)

    targetModal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
      targetModal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == targetModal) {
          targetModal.style.display = "none";
      }
    }
  }

  const modalButtonsList = document.querySelectorAll('.modal-button')
  modalButtonsList.forEach((button) => {
    button.addEventListener("click", triggerModal);
  })
}


export { revealModal }
