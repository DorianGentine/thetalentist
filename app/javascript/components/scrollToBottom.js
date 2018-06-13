function scrollToBottom () {

  let objDiv = document.querySelector('.conversation');

  if (objDiv){
    window.onload = function() {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

}


export { scrollToBottom }
