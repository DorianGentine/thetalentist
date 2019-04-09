let label = document.querySelectorAll('.line-height-center')
if (label.length > 0) {
  for ( var i = 0 ; i < label.length ; i++ ) {
    let parentDiv = label[i].parentNode;
    if (screen.width > 770 ) {
      label[i].style.lineHeight = parentDiv.offsetHeight + "px";
    }
  }
}

