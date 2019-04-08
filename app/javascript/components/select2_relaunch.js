import { initSelect2 } from '../components/select2';
const addForm = document.getElementsByClassName("form-hobby-add")

if (addForm) {
  for (var i = addForm.length - 1; i >= 0; i--) {
    addForm[i].addEventListener("click", () => {
      setTimeout(initSelect2, 1);
    })
  }
}
