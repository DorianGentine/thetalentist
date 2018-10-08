let label = document.querySelectorAll('.line-height-center')
if (label) {
  for ( var i = 0 ; i < label.length ; i++ ) {
    let parentDiv = label[i].parentNode;
    if (parentDiv.offsetHeight < 40 ) {
      label[i].style.lineHeight = parentDiv.offsetHeight + "px";
    }
  }
}
