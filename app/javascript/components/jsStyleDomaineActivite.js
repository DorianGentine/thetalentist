const jsRemove = document.getElementsByClassName("js_remove")
const jsMove = document.getElementsByClassName("js_move")
const copyValue = document.getElementsByClassName("copy_value")

if (jsRemove.length > 0) {
  // remove unecessary element
  for (var i = 2; i < jsRemove.length; i++) {
    jsRemove[i].style.display = "none";
  }

  // Copie la valeur des années d'expériences
  copyValue[0].addEventListener("blur", () => {
    copyValue[1].value = copyValue[0].value
  });

  // change la place
  jsMove[0].insertAdjacentElement("afterend", jsMove[1]);

  // change le placeholder
  setTimeout( () => {
    jsMove[0].getElementsByClassName("select2-selection__rendered")[0].title = "Domaine d'activité principale"
  }, 30)
}
