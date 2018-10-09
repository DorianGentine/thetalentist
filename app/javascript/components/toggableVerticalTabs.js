 function openOnglet() {
    // Declare all variables

    // Show the current tab, and add an "active" class to the link that opened the tab
    function actionLink(event){
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");

      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].classList.remove("active");
      }


      let idtab = event.currentTarget.dataset.idtab
      let tab = document.getElementById(idtab)
      tab.style.display = "block";
      event.currentTarget.classList.add("active");
    }
    // Get the good div clicked
    let tablinkAll = document.querySelectorAll(".tablinks");
    tablinkAll.forEach((tablink) => {
      tablink.addEventListener('click', actionLink)
    })
  }

export { openOnglet };



