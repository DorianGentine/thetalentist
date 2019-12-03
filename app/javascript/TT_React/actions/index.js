import "babel-polyfill";

export const FETCH_TALENTS = 'FETCH_TALENTS';
export const FETCH_JOBS = 'FETCH_JOBS';
export const UPDATE_FILTER = 'UPDATE_FILTER';

export async function fetchGET(url, type) {
  let response = await fetch(url)
  let promise
  if(response.ok){
    promise = await response.json();
  } else {
    console.error(`${type} ne passe pas : `, response)
    promise = null
  }

  return {
    type: type,
    payload: promise
  };}

export function updateFilter(job){
  // if(!e.target.classList.contains('green-background')){
  //   filtreActifs.push(job)
  // }else{
  //   const indexMetier = filtreActifs.indexOf(job)
  //   filtreActifs.splice(indexMetier, 1);
  // }
  return {
    type: UPDATE_FILTER,
    payload: job
  }
}
