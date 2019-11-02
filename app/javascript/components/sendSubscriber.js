// const allowNewsletter =  document.getElementById('allow_newsletter')

// const listID = "aa6e2ae6f6"
// const mail = "dorian@avemcreation.com"
// const md5 =  "bd8bee6057f2b97a5e37fb6bef0475a3"
// // let authenticationString = '4956017d96b8ce1d647fd93600de861c-us5'
// let authenticationString = btoa('anystring:4956017d96b8ce1d647fd93600de861c-us5');
//     authenticationString = "Basic " + authenticationString;

// if(allowNewsletter){
//   allowNewsletter.addEventListener('change', () => {
//     console.log('yo', allowNewsletter.value)
//   })

//   fetch(`https://us5.api.mailchimp.com/3.0/lists/${listID}/members/${md5}`, {
//       mode: 'no-cors',
//       method: 'GET',
//       headers: {
//         'user': 'anystring:4956017d96b8ce1d647fd93600de861c-us5',
//         'authorization': authenticationString,
//       }})
//     .then(response => console.log(response))
//     .then(response => response.json())
//     .then((data) => {
//       console.log('get data', data)
//       display(data)
//     })
// }



// //     fetch('https://us9.api.mailchimp.com/3.0/lists/111111/members', {
// //       mode: 'no-cors',
// //       method: 'POST',
// //       headers: {
// //         'authorization': authenticationString,
// //         'Accept': 'application/json',
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({
// //         email_address: "dude@gmail.com",
// //         status: "subscribed",
// //       })
// //     }).then(function(e){
// //         console.log("fetch finished")
// //     }).catch(function(e){
// //         console.log("fetch error");
// //     })
