var limitedCharacter = document.getElementsByClassName("limited-character");

if (limitedCharacter.length > 0) {
  for (var i = 0; i < limitedCharacter.length ; i++) {
    var inputLength = limitedCharacter[i].value.length;
    var limitCharacter = limitedCharacter[i].maxLength;
    limitedCharacter[i].parentNode.insertAdjacentHTML("afterend",'<p id="aide-short_resume" class="titre-rubrique-1 float-right" style="margin-top: 5px;"></p>');
    var aideShortResume = document.getElementById("aide-short_resume");

    limitedCharacter[i].addEventListener("input", function(e) {
      inputLength = e.target.value.length;
      aideShortResume.textContent = inputLength + "/" + limitCharacter;
    })

    limitedCharacter[i].addEventListener("focus", function(e) {
        aideShortResume.textContent = inputLength + "/" + limitCharacter;
        aideShortResume.classList.remove("hidden");
    })

    limitedCharacter[i].addEventListener("blur", function(e) {
      aideShortResume.classList.add("hidden");
    })
  }
}
