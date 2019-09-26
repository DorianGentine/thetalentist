import { initSelect2, initSelectize } from '../components/select2';
const addForm = document.getElementsByClassName("form-hobby-add")

if (addForm.length > 0) {
  
  const url = new URL(window.location.href);
  let idtab
  

  if(url.href.endsWith("edit")){
    let tablinkAll = document.querySelectorAll(".tablinks");
    tablinkAll.forEach((tablink) => {
      tablink.addEventListener('click', ()=>{
        idtab = event.currentTarget.dataset.idtab
        console.log(idtab)
      })
    })
  }

  for (var i = addForm.length - 1; i >= 0; i--) {
    addForm[i].addEventListener("click", () => {
      console.log("launched")
      setTimeout(()=>{
        initSelect2()
        let classgenJQuery = "non"

        if(!url.href.endsWith("edit")){
          const numero = document.getElementsByClassName('selectAndCreate').length - 1
          const selectAndCreateRE = document.getElementsByClassName('selectAndCreate')[numero]
          const classgen = "selectAndCreate" + numero
          classgenJQuery = "." + classgen
          selectAndCreateRE.classList.add(classgen)
        }else if (idtab == "formations_et_competences"){
          const numero = document.getElementsByClassName('selectFormations').length - 1
          const selectAndCreateRE = document.getElementsByClassName('selectFormations')[numero]
          const classgen = "selectFormations" + numero
          classgenJQuery = "." + classgen
          selectAndCreateRE.classList.add(classgen)
        }else if (idtab == "experiences_professionnelles"){
          const numero = document.getElementsByClassName('selectExperiences').length - 1
          const selectAndCreateRE = document.getElementsByClassName('selectExperiences')[numero]
          const classgen = "selectExperiences" + numero
          classgenJQuery = "." + classgen
          selectAndCreateRE.classList.add(classgen)          
        }


        initSelectize(classgenJQuery)
      }, 1);
    })
  }
}