import "@babel/polyfill";

export const FETCH_COMPANY_TYPES = 'FETCH_COMPANY_TYPES';
export const FETCH_CONVERSATION_ACTIVE = 'FETCH_CONVERSATION_ACTIVE';
export const FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS';
export const FETCH_FORMATIONS = 'FETCH_FORMATIONS';
export const FETCH_HEADHUNTERS = 'FETCH_HEADHUNTERS';
export const FETCH_JOBS = 'FETCH_JOBS';
export const FETCH_KNOWNS = 'FETCH_KNOWNS';
export const FETCH_LANGUAGES = 'FETCH_LANGUAGES';
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const FETCH_SECTORS = 'FETCH_SECTORS';
export const FETCH_SKILLS = 'FETCH_SKILLS';
export const FETCH_STARTUPS = 'FETCH_STARTUPS';
export const FETCH_TALENT = 'FETCH_TALENT';
export const FETCH_TALENTS = 'FETCH_TALENTS';
export const FETCH_TECHNOS = 'FETCH_TECHNOS';
export const FETCH_USER = 'FETCH_USER';
export const GUIDE_SU = 'GUIDE_SU';
export const MESSAGERIE_ACTIVE_MOBILE = 'MESSAGERIE_ACTIVE_MOBILE';
export const MODAL_CLOSED = 'MODAL_CLOSED';
export const MODAL_OPENED = 'MODAL_OPENED';
export const POST_COMPTE = 'POST_COMPTE';
export const SIDEBAR_ACTIVE_MOBILE = 'SIDEBAR_ACTIVE_MOBILE';
export const UPDATE_TALENT = 'UPDATE_TALENT';

export async function fetchGET(url, type, callback) {
  let response = await fetch(url)
  let promise
  if(response.ok){
    promise = await response.json()
    if(callback){
      await callback(promise)
    }
  } else {
    console.error(`${type} ne passe pas : `, response)
    promise = null
  }

  return {
    type: type,
    payload: promise
  };}

export async function fetchPost(url, body, method, callback) {
  let promise
  let response = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json'},
    body: body ? JSON.stringify(body) : null
  })
  if(response.ok){
    promise = await response.json()
    if(callback){
      await callback(promise)
    }
  } else {
    console.error(`POST_COMPTE ne passe pas : `, response)
    promise = null
  }

  return {
    type: POST_COMPTE,
    payload: promise
  };}

// export function fetchPost(url, body, method, callback) {
//   let request
//   if(body != null){
//     request = fetch(url,
//     {
//       method: method,
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify(body)
//     })
//     .then(response => {
//       response.json()
//       console.log('response', response)
//     })
//     .then((promise) => {
//       console.log('promise', promise)
//       callback
//     })
//   }else if(body === null){
//     request = fetch(url,
//     {
//       method: method,
//       headers: { 'Content-Type': 'application/json'},
//     })
//     .then(callback)
//   }

//   return {
//     type: POST_COMPTE,
//     payload: body
//   };}

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

export function updateConversation(conversationActive, message, status){
  const newConv = JSON.parse(JSON.stringify(conversationActive))
  if(message){
    newConv.conversation.messages.push(message)
  }
  if(status){
    newConv.conversation.in_relation = status
  }
  return {
    type: FETCH_CONVERSATION_ACTIVE,
    payload: newConv
  }
}

export function updateConversations(conversations){
  return {
    type: FETCH_CONVERSATIONS,
    payload: conversations
  }
}

export function updateTalent(talentValues, values, rawValues){
  const talent = talentValues.talent
  Object.keys(values).forEach(value => {
    if(talent[value] !== values[value]){
      talent[value] = values[value]
    }
  })
  if (values.experiences_attributes) {
    const experiences_attributes = rawValues.experiences_attributes
    for (let i = 0; i < experiences_attributes.length; i++) {
      talentValues.experiences[i] = rawValues.experiences_attributes[i]
      talentValues.experiences[i].status = "created"
      // const valueExperience = experiences_attributes[i];
      // if(valueExperience._destroy){
      //   delete talentValues.experiences[i]
      // }else{
      // }
    }
  }
  if (values.talent_formations_attributes) {
    const talent_formations_attributes = values.talent_formations_attributes
    for (let i = 0; i < talent_formations_attributes.length; i++) {
      const valueFormations = talent_formations_attributes[i];
      if(valueFormations._destroy){
        delete talentValues.formations[i]
      }else{
        talentValues.formations[i] = valueFormations
      }
    }
  }
  if(values.next_aventure_attributes){
    const valuesNA = values.next_aventure_attributes
    Object.keys(valuesNA).forEach(value => {
      if(talentValues.next_aventure[value] !== valuesNA[value]){
        talentValues.next_aventure[value] = valuesNA[value]
      }
    })
    if (values.next_aventure_attributes.mobilities_attributes) {
      talentValues.mobilities = values.next_aventure_attributes.mobilities_attributes
    }
  }
  if(values.talent_job_attributes){
    const valuesTJ = values.talent_job_attributes
    Object.keys(valuesTJ).forEach(value => {
      if(talentValues.job[value] !== valuesTJ[value]){
        talentValues.job[value] = valuesTJ[value]
      }
    })
  }
  if(rawValues.next_aventure_attributes && rawValues.next_aventure_attributes.sectors){
    talentValues.sectors = rawValues.next_aventure_attributes.sectors
  }
  if(rawValues.skills){
    talentValues.skills = rawValues.skills
  }
  if(rawValues.knowns){
    talentValues.knowns = rawValues.knowns
  }
  if(rawValues.technos){
    talentValues.technos = rawValues.technos
  }
  if(values.talent_languages_attributes){
    const newLanguages = []
    for (let i = 0; i < values.talent_languages_attributes.length; i++) {
      const language = values.talent_languages_attributes[i];
      if(!language._destroy){
        newLanguages[i] = language
      }
    }
    talentValues.talent_languages = newLanguages
  }
  console.log('talentValues', talentValues)

  return {
    type: FETCH_TALENT,
    payload: talentValues
  }
}

export function updateTalents(talents){
  
  return {
    type: FETCH_TALENTS,
    payload: talents
  }
}