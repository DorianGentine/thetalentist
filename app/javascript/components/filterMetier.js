const filterMetiers = document.getElementById('filterMetiers')

if (filterMetiers){
	const btnFiltres = filterMetiers.getElementsByClassName('btn-filtre')
	const cardTalents = document.getElementsByClassName('talentCard')
  const searchResults = document.getElementById('search-results')
	let filtreActifs = []
  let nbActifs, accord

	const showCards = () => {
    nbActifs = 0
		for (var i = cardTalents.length - 1; i >= 0; i--) {
			const cardTitle = cardTalents[i].getElementsByClassName('card-title')[0].firstElementChild.innerText.toLowerCase().trim()

			if(filtreActifs.length === 0){
				cardTalents[i].style.display = "block"
        nbActifs = nbActifs + 1
			} else {
				if(filtreActifs.includes(cardTitle)){
					cardTalents[i].style.display = "block"
          nbActifs = nbActifs + 1
				} else {
					cardTalents[i].style.display = "none"
				}
			}

		}
    let filtreCapitalized = filtreActifs.map(a => a.charAt(0).toUpperCase() + a.slice(1))

    if (filtreActifs.length === 0){
      const url = new URL(window.location.href);
      const filtreRuby = url.searchParams.get("tag");
      filtreCapitalized = ["Tous"]
      if(filtreRuby){
        filtreCapitalized = [filtreRuby]
      }
    }

    if (nbActifs === 0) {
      nbActifs = "Aucun"
      accord = " profil</strong> ne correspond"
    } else if (nbActifs === 1){
      accord = " profil</strong> correspond"
    } else {
      accord = " profils</strong> correspondent"
    }

    searchResults.innerHTML = "<strong>" + nbActifs + accord + " à votre recherche '" + filtreCapitalized.join(", ") + "'"
	}

	for (var i = btnFiltres.length - 1; i >= 0; i--) {
		btnFiltres[i].addEventListener('click', (e) => {
			if(!e.target.classList.contains('green-background')){
				e.target.classList.add('green-background', 'white')
				filtreActifs.push(e.target.dataset.metier.toLowerCase())
			}else{
				e.target.classList.remove('green-background', 'white')
				const indexMetier = filtreActifs.indexOf(e.target.dataset.metier.toLowerCase())
				filtreActifs.splice(indexMetier, 1);
			}
			showCards()
		})
	}
}
