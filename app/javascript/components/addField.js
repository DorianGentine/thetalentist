function addFields(){

  const btn = document.getElementById("bt-formation")

  if (btn) {

    btn.onclick = function() {
      let div = document.createElement('div');
      let count = document.getElementById("formations").childElementCount -1;

      div.setAttribute('class', 'add-forma');
      div.innerHTML = document.getElementById('formation-hidden').innerHTML;

      document.getElementById('formations').appendChild(div);

    }
  }
}


export { addFields }




