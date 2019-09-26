
const notification = document.getElementById("notifications")

notification.addEventListener("click", ()=>{
  notification.classList.toggle("closed")
})

const display = (data) => {
  data.forEach((notif) => {
    let p = `<p>${notif.title}<br>il y a ${notif.created_at} </p>`
    notifications.insertAdjacentHTML("afterbegin", p)
  })
}



function fetchNotifications(){
  if (notification) {
    fetch(`/api/v1/notifications`)
      .then(response => response.json())
      .then((data) => {
        console.log('get data', data)
        display(data)
      });
  }
}


export {fetchNotifications}
