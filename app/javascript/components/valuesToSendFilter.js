const mobilitiesEdit = (valuesToSend, talent) => {
  for (let i = 0; i < valuesToSend.next_aventure_attributes.mobilities_attributes.length; i++) {
    const mobility = valuesToSend.next_aventure_attributes.mobilities_attributes[i];
    let mobility_id
    if(talent.mobilities[i]){
      mobility_id = talent.mobilities[i].id
    }
    valuesToSend.next_aventure_attributes.mobilities_attributes[i] = {
      id: mobility_id,
      title: mobility,
      next_aventure_id: talent.next_aventure.id,
    }
  }
  for (let i = 0; i < talent.mobilities.length; i++) {
    const initialMobility = talent.mobilities[i];
    const mobility = valuesToSend.next_aventure_attributes.mobilities_attributes[i];
    if(!mobility){
      valuesToSend.next_aventure_attributes.mobilities_attributes[i] = {
        id: initialMobility.id,
        _destroy: true
      }
    }
  }
}

const jobsEdit = valuesToSend => {
  const jobs = valuesToSend.talent_job_attributes.job_id
  if(valuesToSend.talent_second_job_attributes && jobs[1]){
    valuesToSend.talent_second_job_attributes.job_id = jobs[1]
  }else if(valuesToSend.talent_second_job_attributes){
    valuesToSend.talent_second_job_attributes._destroy = true
  }
  if(jobs[0]){
    valuesToSend.talent_job_attributes.job_id = jobs[0]
  }else{
    valuesToSend.talent_job_attributes.job_id = jobs.id
  }
}

const waitingForEdit = valuesToSend => {
  const nAA = valuesToSend.next_aventure_attributes
  const waitingFor = valuesToSend.next_aventure_attributes.waiting_for_one
  nAA.waiting_for_three = waitingFor[2] || null
  nAA.waiting_for_two = waitingFor[1] || null
  nAA.waiting_for_one = waitingFor[0]
}

const skillsEdit = valuesToSend => {
  valuesToSend.talent = {
    skill_ids: []
  }
  for (let i = 0; i < valuesToSend.skill_ids.length; i++) {
    const element = valuesToSend.skill_ids[i];
    const infoToSend = element.id || element.value
    valuesToSend.talent.skill_ids[i] = infoToSend
  }
  delete valuesToSend['skill_ids']
}

const knownsEdit = valuesToSend => {
  valuesToSend.talent = {
    known_ids: []
  }
  for (let i = 0; i < valuesToSend.known_ids.length; i++) {
    const element = valuesToSend.known_ids[i];
    const infoToSend = element.id || element.value
    valuesToSend.talent.known_ids[i] = infoToSend
  }
  delete valuesToSend['known_ids']
}

const sectorsEdit = valuesToSend => {
  const sectors = valuesToSend.next_aventure_attributes.sectors
  valuesToSend.next_aventure_attributes.sector_ids = []
  for (let i = 0; i < sectors.length; i++) {
    const sector = sectors[i];
    valuesToSend.next_aventure_attributes.sector_ids[i] = sector.id
  }
  delete valuesToSend.next_aventure_attributes['sectors']
}

const languagesEdit = (valuesToSend, savedTLIds) => {
  const languages = valuesToSend.talent_languages
  valuesToSend.talent_languages_attributes = []

  const assignLanguageAttribute = (i) => {
    const language = languages[i];
    if(language){
      if(language.language_id && !savedTLIds[i]){
        valuesToSend.talent_languages_attributes[i] = {id: language.id, language_id: language.language_id}
      }else if(!language.language_id && !savedTLIds[i]){
        valuesToSend.talent_languages_attributes[i] = {language_id: language.id}
      }else if(language.language_id && savedTLIds[i]){
        valuesToSend.talent_languages_attributes[i] = {id: savedTLIds[i], language_id: language.language_id}
      }else if(!language.language_id && savedTLIds[i]){
        valuesToSend.talent_languages_attributes[i] = {id: savedTLIds[i], language_id: language.id}
      }
    }else if(savedTLIds[i]){
      valuesToSend.talent_languages_attributes[i] = {id: savedTLIds[i], _destroy: true}
    }
  }

  for (let i = 0; i < 3; i++) {
    assignLanguageAttribute(i)
  }
  delete valuesToSend['talent_languages']
}

const photoEdit = (photo, talent) => {
  const formData = new FormData();
    formData.append("photo", photo);
    fetch(`/api/v1/talents/${talent.talent.id}/update_avatar`, {method: "PATCH", body: formData})
}

export default function valuesToSendFilter(infos){
  console.log("j'y suis ;)", infos)
  const valuesToSend = {}
  const values = infos.values
  const initialValues = infos.initialValues
  const talent = infos.talent
  
  let step, photo
  if(infos.step){
    step = infos.step
  }
  if(infos.photo){
    photo = infos.photo
  }

  Object.keys(values).forEach(value => {
    if(typeof values[value] == "object"){
      if(JSON.stringify(initialValues[value]) !== JSON.stringify(values[value])){
        valuesToSend[value] = JSON.parse(JSON.stringify(values[value]))  
        if(value == "talent_job_attributes" && values.talent_second_job_attributes){
          console.log("sorry bro")
          valuesToSend["talent_second_job_attributes"] = JSON.parse(JSON.stringify(values.talent_second_job_attributes))
        }
      }
    }else if(initialValues[value] !== values[value]){
      valuesToSend[value] = JSON.parse(JSON.stringify(values[value]))
    }

  })

  // Met en page les mobilities
  if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.mobilities_attributes && (step == 2 || !step) ){
    mobilitiesEdit(valuesToSend, talent)
  }

  // Met en page les jobs
  if(valuesToSend.talent_job_attributes && valuesToSend.talent_job_attributes.job_id){
    jobsEdit(valuesToSend)
  }

  // Met en page les waiting_for
  if(valuesToSend.next_aventure_attributes && 
    valuesToSend.next_aventure_attributes.waiting_for_one && 
    valuesToSend.next_aventure_attributes.waiting_for_one.length > 0){
    waitingForEdit(valuesToSend)
  }

  // Met en page les skill_ids
  if(valuesToSend.skill_ids && valuesToSend.skill_ids.length > 0){
    skillsEdit(valuesToSend)
  }

  // Met en page les known_ids
  if(valuesToSend.known_ids && valuesToSend.known_ids.length > 0){
    knownsEdit(valuesToSend)
  }

  // MEP availability
  if(valuesToSend.next_aventure_attributes && 
    valuesToSend.next_aventure_attributes.availability &&
    typeof valuesToSend.next_aventure_attributes.availability == "object"){
    valuesToSend.next_aventure_attributes.availability = valuesToSend.next_aventure_attributes.availability[0]
  }

  // MEP remuneration
  if(valuesToSend.next_aventure_attributes && 
    valuesToSend.next_aventure_attributes.remuneration &&
    typeof valuesToSend.next_aventure_attributes.remuneration == "object"){ // Sert à filtrer infos depuis le profil
    valuesToSend.next_aventure_attributes.remuneration = valuesToSend.next_aventure_attributes.remuneration[0]
  }
  
  // MEP contrat
  if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.contrat){
    valuesToSend.next_aventure_attributes.contrat = valuesToSend.next_aventure_attributes.contrat[0]
  }

  // MEP sector_ids
  if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.sectors){
    sectorsEdit(valuesToSend)
  }

  // MEP languages
  if(valuesToSend.talent_languages){
    languagesEdit(valuesToSend, infos.savedTLIds)
  }

  // MEP photo
  if(photo){
    photoEdit(photo, talent)
  }
  
  return valuesToSend
}