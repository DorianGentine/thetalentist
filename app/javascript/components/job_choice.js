function jobFilter() {
  const submit = document.querySelector(".submit-filtre");
  const form = document.getElementById('search-lg')

  if (form) {
    $(document).ready(function(){
      $(".category-choice").click(function(){
        $(this).toggleClass("selected");
      });
    });
    const inputs = form.getElementsByTagName("input")
    Array.from(inputs).forEach((input) => {
      input.addEventListener("click", function(){
        submit.click();
      });
    })
  }
}

export { jobFilter }








