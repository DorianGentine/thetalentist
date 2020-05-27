const setFormContainerClass = (actualStep, formStep) => {
  let formContainerClass = "form-container form-appearance hidden"
  if(actualStep == formStep + 1){
    formContainerClass = "form-container form-hidden"
  }else if(actualStep == formStep){
    formContainerClass = "form-container"
  }else if(actualStep == formStep - 1){
    formContainerClass = "form-container form-appearance"
    setTimeout(()=>{
      let formHidden = document.getElementsByClassName("form-container")
      formHidden = formHidden[formHidden.length - 1]
      formHidden.classList.add('hidden')
    }, 1000)
  }
  return formContainerClass
}

export { setFormContainerClass }
