function jobFilter() {

  if (document.getElementById('search-lg')) {
    $(document).ready(function(){
      $(".category-choice").click(function(){
        $(this).toggleClass("selected");
      });
    });
  });

  const submit = document.querySelector(".submit-filtre");
  const form = document.getElementById('search-lg')
  if (form) {
    const inputs = form.getElementsByTagName("input")
    Array.from(inputs).forEach((input) => {
      input.addEventListener("click", function(){
        submit.click();
      });
    })
  }
}

export { jobFilter }








