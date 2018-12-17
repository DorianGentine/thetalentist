function scrollToBottom () {

  let objDiv = document.getElementById('conversation');

  if (objDiv){
    window.addEventListener("load", function() {
      $(objDiv).scrollTop($(objDiv)[0].scrollHeight);
    })
  }

}


export { scrollToBottom }
