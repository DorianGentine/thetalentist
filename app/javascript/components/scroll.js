function scrollMessagesIntoView(){
  let messages = document.querySelectorAll('.message');
  let lastMessage = messages[messages.length - 1];
  console.log(lastMessage)
  if (lastMessage !== undefined) {
    lastMessage.scrollIntoView();
  }
}

export { scrollMessagesIntoView }
