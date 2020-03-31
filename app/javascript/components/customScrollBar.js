handleScroll = (e) => {
  if (e.target.classList.contains("on-scrollbar") === false) {
      e.target.classList.add("on-scrollbar");
      setTimeout(() => {
        e.target.classList.remove("on-scrollbar");
      }, 500)
  }
}

const scrollingDiv = document.getElementsByClassName("scroll")

for (var i = scrollingDiv.length - 1; i >= 0; i--) {
  scrollingDiv[i].addEventListener("scroll", handleScroll);
}
