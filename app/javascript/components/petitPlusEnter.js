const petitPlusInput = document.getElementsByClassName('input_petit_plus')

if(petitPlusInput){
  let petitPlusBtn
  let btnPushed = false

  for (var i = petitPlusInput.length - 1; i >= 0; i--) {
    petitPlusInput[i].addEventListener("keydown", (e, i) => {
      if(e.key === "Enter" && !btnPushed){
        btnPushed = true
        petitPlusBtn = document.getElementById('add_petit_plus')
        e.preventDefault()
        petitPlusBtn.click()
        petitPlusInput[petitPlusInput.length - 1].focus()
      }
    })
  }
  btnPushed = false
}
