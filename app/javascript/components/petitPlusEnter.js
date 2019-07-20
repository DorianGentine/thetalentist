const petitPlusInput = document.getElementsByClassName('input_petit_plus')

if(petitPlusInput){
  let petitPlusBtn = null
  let btnPushed = false

  const renderNewInput = (e, index) => {
    if(e.key === "Enter" && !btnPushed){
      console.log("launch", btnPushed)
      btnPushed = true
      if(petitPlusBtn === null){
        petitPlusBtn = document.getElementById('add_petit_plus')
      }
      e.preventDefault()
      petitPlusBtn.click()
      defineEventListener()
      petitPlusInput[petitPlusInput.length - 1].focus()
    }
  }

  const defineEventListener = () => {
    btnPushed = false
    for (let i = 0; i < petitPlusInput.length; i++) {
      const index = i + 1
      petitPlusInput[i].addEventListener("keydown", e => renderNewInput(e, index))
    }
  }

  defineEventListener()
}
