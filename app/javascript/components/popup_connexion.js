const popup = document.getElementById('popup_connexion')
if(popup){
	// const url = new URL(window.location.href);
	// const info = url.searchParams.get("info");
	// if(info){
	// 	popup.style.display = "block"
	// }

	const close = document.getElementById('close_popup_connexion')
	close.addEventListener('click', ()=>{
		popup.style.transform = "translateY(10px)"
		popup.style.opacity = "0"
		setTimeout(()=>{ popup.style.display = "none" },1000)
	})

}