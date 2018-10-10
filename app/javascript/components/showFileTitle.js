
var input = document.getElementById( 'mailboxer_message_attachment' );

if (input != null) {
  var infoArea = document.getElementById( 'uploadFile' );

  input.addEventListener( 'change', showFileName );
}
function showFileName( event ) {

  // the change event gives us the input it occurred in
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var fileName = input.files[0].name;

  // use fileName however fits your app best, i.e. add it into a div
  infoArea.textContent = fileName;
}


$(function() {
  function readURL(input, target) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      let idImg = document.getElementById("img_prev" + target)
      console.log(idImg)

      reader.onload = function (e) {
        $(idImg).attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  function triggerAvatar(event){
    let targetAvatar = event.currentTarget.dataset.target
    let idAvatar = document.getElementById("avatar-upload" + targetAvatar)
    let idImgAvatar = document.getElementById("no_img" + targetAvatar)
    let idPrevAvatar = document.getElementById("div_img_prev" + targetAvatar)
  $(idAvatar).change(function(){
    $(idImgAvatar).addClass('hidden');
    $(idPrevAvatar).removeClass('hidden');
    console.log(this)
    console.log(idAvatar)
    readURL(this, targetAvatar);
  });

  }

  const btnAvatars = document.querySelectorAll('.btn-avatar')
  btnAvatars.forEach((btn) => {
    btn.addEventListener('click', triggerAvatar)
  })
});
