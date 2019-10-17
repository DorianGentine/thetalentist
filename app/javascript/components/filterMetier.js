const filterMetiers = document.getElementById('filterMetiers')

if (filterMetiers){
	const btnFiltres = filterMetiers.getElementsByClassName('btn-filtre')
	const cardTalents = document.getElementsByClassName('talentCard')
	let filtreActifs = []

	const showCards = () => {
		for (var i = cardTalents.length - 1; i >= 0; i--) {
			const cardTitle = cardTalents[i].getElementsByClassName('card-title')[0].firstElementChild.innerText.toLowerCase().trim()
			
			if(filtreActifs.length === 0){
				cardTalents[i].style.display = "block"
			} else {
				if(filtreActifs.includes(cardTitle)){
					cardTalents[i].style.display = "block"
				} else {
					cardTalents[i].style.display = "none"
				}
			}

		}
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