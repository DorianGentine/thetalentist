import { initSelect2, initSelectize } from '../components/select2';
const addForm = document.getElementsByClassName("form-hobby-add")

if (addForm.length > 0) {
  for (var i = addForm.length - 1; i >= 0; i--) {
    addForm[i].addEventListener("click", () => {
      console.log("launched")
      setTimeout(()=>{
        initSelect2()

        const numero = document.getElementsByClassName('selectAndCreate').length - 1
        console.log(document.getElementsByClassName('selectAndCreate'))
        const selectAndCreateRE = document.getElementsByClassName('selectAndCreate')[numero]
        const classgen = "selectAndCreate" + numero
        const classgenJQuery = "." + classgen
        selectAndCreateRE.classList.add(classgen)

        initSelectize(classgenJQuery)
      }, 1);
    })
  }
}

// const addFormation = document.getElementById('add_formation')
// if(addFormation){
  // let nbApparu = 0
  // const nfFormations = document.getElementsByClassName('nf-formations')
//   const addFormation2 = document.getElementById('add_formation2')

//   for (let i = 0; i < nfFormations.length; i++) {
//     if(nfFormations[i].getElementsByTagName('select')[0].value != ""){
//       console.log(nfFormations[i].getElementsByTagName('select')[0].value)
//       nbApparu = nbApparu + 1
//     }
//   }

  // const renderFormations = () => {
    // for (let i = 0; i < nfFormations.length; i++) {
    //   if(i <= 0){
    //     nfFormations[i].style.display = "flex"
    //   }else{
    //     nfFormations[i].style.display = "none"
    //   }
    // }
  // }

//   addFormation.addEventListener("click", ()=>{
//     console.log("nbApparu", nbApparu)
//     if(nbApparu < 3){
//       nbApparu = nbApparu + 1
//       renderFormations()
//     }else if(nbApparu = 3){
//       nbApparu = nbApparu + 1
//       renderFormations()
//       addFormation.style.display = "none"
//       addFormation2.classList.remove('hidden')
//     }
//   })

  // renderFormations()
// }
