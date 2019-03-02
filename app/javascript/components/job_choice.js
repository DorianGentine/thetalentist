function jobFilter() {

  if (document.getElementById('search-lg')) {
    $(document).ready(function(){
      $(".category-choice").click(function(){
        $(this).toggleClass("selected");
      });
    });

    const submit = document.querySelector(".submit-filtre");
    const inputs = document.getElementById('search-lg').getElementsByTagName("input")
    Array.from(inputs).forEach((input) => {
      input.addEventListener("click", function(){
        submit.click();
      });
    })
  }


}

export { jobFilter }








