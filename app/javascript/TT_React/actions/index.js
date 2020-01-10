import "@babel/polyfill";

export const FETCH_TALENTS = 'FETCH_TALENTS';
export const FETCH_JOBS = 'FETCH_JOBS';
export const MODAL_CLOSED = 'MODAL_CLOSED';
export const MODAL_OPENED = 'MODAL_OPENED';
export const POST_COMPTE = 'POST_COMPTE';
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

export function fetchPost(url, body, method, callback) {
  let request
  if(body != null){
    request = fetch(url,
    {
      method: method,
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(callback)
  }else if(body === null){
    request = fetch(url,
    {
      method: method,
      headers: { 'Content-Type': 'application/json'},
    })
    .then(callback)
  }

  return {
    type: POST_COMPTE,
    payload: body
  };}

export function updateFilter(job){
  return {
    type: UPDATE_FILTER,
    payload: job
  }
}

export function openModalTalent(talent){
  return {
    type: MODAL_OPENED,
    payload: talent
  }
}

export function closeModalTalent(talent){
  return {
    type: MODAL_CLOSED,
    payload: talent
  }
}

