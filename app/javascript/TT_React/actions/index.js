import "babel-polyfill";

export const FETCH_TALENTS = 'FETCH_TALENTS';
export const TEST = 'TEST';

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
