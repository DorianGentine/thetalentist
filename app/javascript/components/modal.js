function revealModal() {
  let triggerModal = (event) => {
    let targetModalID
    if(typeof event === "string"){
      targetModalID = `modal_${event}` // select modal from url
    }else{
      targetModalID = event.currentTarget.dataset.target
    }
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
      if (event.key === "Escape" && targetModal.style.display == "block") {
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


  const url = new URL(window.location.href);
  // const modal_id = url.searchParams.get("talent");
  const newMember = url.searchParams.get("query");
  if(newMember == "new_member5"){
    const guide_5 = document.getElementById('guide-su-5')
    guide_5.style.display = "block";
    const closeGuide = document.getElementById('close_guide_5')
    closeGuide.addEventListener('click', () => {
      guide_5.style.display = "none"
    })
  }else if(newMember == "new_member6"){
    const guide_6 = document.getElementById('guide-su-6')
    guide_6.style.display = "block";
    const closeGuide = document.getElementsByClassName('close_guide_6')
    for (var i = closeGuide.length - 1; i >= 0; i--) {
      closeGuide[i].addEventListener('click', () => {
        guide_6.style.display = "none"
      })
    }
  }

  let modalButtonsList = document.querySelectorAll('.modal-button')
  modalButtonsList.forEach((button) => {
    button.addEventListener("click", triggerModal);
  })

}


export { revealModal }
