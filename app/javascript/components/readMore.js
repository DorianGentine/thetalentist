
function readMore(){

  var colls = document.getElementsByClassName("read-more");

    var i;

    for ( i = 0; i < colls.length; i++) {
      colls[i].addEventListener("click", function() {
      // Change texte à l'intérieur
        if (this.getAttribute("data-text-swap") == this.innerHTML) {
          this.innerHTML = this.getAttribute("data-text-original");
        } else {
          this.setAttribute("data-text-original", this.innerHTML);
          this.innerHTML = this.getAttribute("data-text-swap");
        }

      // Change couleur background
        this.classList.toggle("red-background")

      // Show read-more-content
        var content = document.getElementsByClassName("read-more-content");
        for (i = 0; i < content.length; i++) {
          if (content[i].style.display === "block") {
            content[i].style.display = "none";
          } else {
            content[i].style.display = "block";
          }
        }
      });
    }

}

export { readMore }


