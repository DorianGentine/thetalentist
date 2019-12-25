import "@babel/polyfill";

export const FETCH_TALENTS = 'FETCH_TALENTS';
export const FETCH_JOBS = 'FETCH_JOBS';
export const MODAL_CLOSED = 'MODAL_CLOSED';
export const MODAL_OPENED = 'MODAL_OPENED';
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

