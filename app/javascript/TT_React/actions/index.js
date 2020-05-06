import "@babel/polyfill";

export const FETCH_CONVERSATION_ACTIVE = 'FETCH_CONVERSATION_ACTIVE';
export const FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS';
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const FETCH_TALENTS = 'FETCH_TALENTS';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_JOBS = 'FETCH_JOBS';
export const GUIDE_SU = 'GUIDE_SU';
export const MESSAGERIE_ACTIVE_MOBILE = 'MESSAGERIE_ACTIVE_MOBILE';
export const MODAL_CLOSED = 'MODAL_CLOSED';
export const MODAL_OPENED = 'MODAL_OPENED';
export const NB_TALENTS = 'NB_TALENTS';
export const POST_COMPTE = 'POST_COMPTE';
export const SIDEBAR_ACTIVE_MOBILE = 'SIDEBAR_ACTIVE_MOBILE';
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

export function closeGuideSu(){
  const nextStep = 0

  return {
    type: GUIDE_SU,
    payload: nextStep
  }
}
export function nextGuideSu(step){
  const nextStep = step + 1

  return {
    type: GUIDE_SU,
    payload: nextStep
  }
}
export function prevGuideSu(step){
  const prevStep = step - 1

  return {
    type: GUIDE_SU,
    payload: prevStep
  }
}

export function updateFilter(job){
  return {
    type: UPDATE_FILTER,
    payload: job
  }
}

export function updateTalents(nbTalents){
  if(nbTalents == -1){
    nbTalents = 0
  }else{
    nbTalents
  }

  return {
    type: NB_TALENTS,
    payload: nbTalents
  }
}

export function openMessagerie(opened){
  return {
    type: MESSAGERIE_ACTIVE_MOBILE,
    payload: !opened
  }
}

export function openModalTalent(talent){
  return {
    type: MODAL_OPENED,
    payload: talent
  }
}

export function openSidebar(opened){
  return {
    type: SIDEBAR_ACTIVE_MOBILE,
    payload: !opened
  }
}

export function closeModalTalent(talent){
  return {
    type: MODAL_CLOSED,
    payload: talent
  }
}

