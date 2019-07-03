const url = new URL(window.location.href);
const modal_id = url.searchParams.get("talent");
if(modal_id){
  const modal = document.getElementById(`modal_${modal_id}`)
  const talentCard = document.getElementsByClassName('talent-card')
  for (var i = talentCard.length - 1; i >= 0; i--) {
    if(talentCard[i].dataset.target === `modal_${modal_id}`){
      console.log(talentCard[i])
    }
  }

}
