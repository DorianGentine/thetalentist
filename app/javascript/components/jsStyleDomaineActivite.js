const jsRemove = document.getElementsByClassName("js_remove")
const jsMove = document.getElementsByClassName("js_move")

if (jsRemove.length > 0) {
  // remove unecessary element
  for (var i = 2; i < jsRemove.length; i++) {
    jsRemove[i].style.display = "none";
  }

  // change la place
  jsMove[0].insertAdjacentElement("afterend", jsMove[1]);

  // change le placeholder
  setTimeout( () => {
    jsMove[0].getElementsByTagName("input")[0].placeholder = "Domaine d'activité principale"
  }, 30)
}
