

function init_select2(){

};

function addSelect2(){
  const formation = document.getElementById('formations')
  const btn = formation.querySelectorAll(".form-hobby-add")

  console.log(btn[0])
    btn[0].addEventListener('click', function(){
    let formation2 = document.getElementById('formations')
    let nesteds = formation2.querySelectorAll(".nested-fields")


    })


}
  // console.log(forms)
  // console.log(forms[0])
  // console.log(forms[1])
  // for (var i = 0; i < forms.length; i++) {
  //   (forms[i]).on("cocoon:after-insert", function(_, row){
  //     console.log(row)
  //     field = $(row).find(".select2")
  //     init_select2(field);
  //   });
  // }


export { init_select2, addSelect2 }
