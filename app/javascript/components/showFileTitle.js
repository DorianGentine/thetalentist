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
  function triggerAvatar(event){
    const targetAvatar = event.currentTarget.dataset.target
    const idAvatar = document.getElementById("avatar-upload" + targetAvatar)
    const idAvatarRemove = document.getElementById("avatar-remove" + targetAvatar)
    const idImg = document.getElementById("img_prev" + targetAvatar)
    const idPrevAvatar = document.getElementById("no_img" + targetAvatar)
    $(idAvatar).change(function(){
      if ( this.files[0].size > 10000000 ) {
        // Esthétiquement pas joli : à revoir.
        // var text = "<p class='col-xs-10 red' style='font-size: 11px;'>Votre photo est trop lourde</p>"
        // idPrevAvatar.parentNode.insertAdjacentHTML("beforeend",text)
        alert("Votre photo est trop large : 10MB maximum. Nous vous invitons à en charger une moins grosse 🙂" )
      } else {
        console.log("J'ai envoyé photo")
        console.log('this', this)
        console.log('targetAvatar', targetAvatar)
        readURL(this, targetAvatar);
        if (idAvatarRemove && idAvatarRemove.checked) {
          idAvatarRemove.checked = false;
        }
      }
    });
    $(idAvatarRemove).change(function(){
      if (idAvatarRemove.checked) {
        $(idImg).attr('src', 'https://images.homedepot-static.com/productImages/fc91cb23-b6db-4d32-b02a-f1ed61dd39a8/svn/folkstone-matte-formica-laminate-sheets-009271258408000-64_400_compressed.jpg');
      }
    });
  }

  const btnAvatars = document.querySelectorAll('.btn-avatar')
  btnAvatars.forEach((btn) => {
    btn.addEventListener('click', triggerAvatar)
  })
});



function readURL(input, target) {
  console.log(input.files[0])
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    let idImg = document.getElementById("img_prev" + target)
    reader.onload = function (e) {
      $(idImg).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);

  }
}

function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};
