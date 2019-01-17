function jobFilter() {

  $(document).ready(function(){
    $(".category-choice").click(function(){
      $(this).toggleClass("selected");
    });
  });

  const data = document.getElementById("data");
  const sales = document.getElementById("sales");
  const product = document.getElementById("product");
  const market = document.getElementById("marketing");
  const submit = document.querySelector(".submit-filtre");

  if (data) {
    data.addEventListener("click", function(){
      submit.click();
    });
  }
  if (sales) {
    sales.addEventListener("click", function(){
      submit.click();
    });
  }
  if (product) {
    product.addEventListener("click", function(){
      submit.click();
    });
  }
  if (market) {
    market.addEventListener("click", function(){
      submit.click();
    });
  }
}

export { jobFilter }








