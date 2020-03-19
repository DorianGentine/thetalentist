export function renderDate(date, format = null){
  let dateToRender
  if(date === undefined){
    dateToRender = new Date();
  }else{
    dateToRender = new Date(date);
  }

  let weekday = new Array(7);
  weekday[0] = "dimanche";
  weekday[1] = "lundi";
  weekday[2] = "mardi";
  weekday[3] = "mercredi";
  weekday[4] = "jeudi";
  weekday[5] = "vendredi";
  weekday[6] = "samedi";
  let jour = weekday[dateToRender.getDay()];

  let dd = String(dateToRender.getDate()).padStart(2, '0');
  let mm = String(dateToRender.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = dateToRender.getFullYear();
  let hour = dateToRender.getHours()
  let min = String(dateToRender.getMinutes()).padStart(2, '0')

  if(format === null){
    dateToRender = dd + '/' + mm + '/' + yyyy;
  }else if(format === "dd_mmm"){
    mm = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"][dateToRender.getMonth()];
    dateToRender = dd + ' ' + mm;
  }else if(format === "ddd_mmm_hhhh"){
    mm = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"][dateToRender.getMonth()];
    dateToRender = `${jour} ${dd} ${mm} ${hour}:${min}`;
  }

  return dateToRender
}

export function diffDays(date) {
  const t1 = date.getTime();
  const t2 = new Date().getTime(); // date d'aujourd'hui

  let hourT1 = parseInt(`${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}`)
  let hourT2 = parseInt(`${String(new Date().getHours()).padStart(2, '0')}${String(new Date().getMinutes()).padStart(2, '0')}`)

  let dayToRender = parseInt((t1-t2)/(24*3600*1000))

  if(hourT2 >= hourT1){
    dayToRender = dayToRender + 1
  }

  return dayToRender;
}

export function diffTime(date) {
  const t1 = new Date(date).getTime();
  const t2 = new Date().getTime(); // date d'aujourd'hui
  const time = parseInt((t2-t1)/(60*1000))
  if(time < 60){
    return `${time}min`
  }else if(time < 1440){
    const timeH = Math.trunc(time/60)
    return `${timeH}h`
  }else{
    const timeD = Math.trunc(time/1440)
    return `${timeD}j`
  }
}

export function postedAgo(date){
  const t1 = new Date(date).getTime();
  const t2 = new Date().getTime(); // date d'aujourd'hui
  const timeMin = parseInt((t2-t1)/(60*1000));

  let time = ""
  let timeHeure = 0
  let timeJour = 0
  let timeSemaine = 0

  if(timeMin < 60){
    time = `${timeMin} ${timeMin > 1 ? "minutes" : "minute"}`
  }else{
    timeHeure = Math.floor(timeMin/60)
    time = `${timeHeure} ${timeHeure > 1 ? "heures" : "heure"}`
  }

  if(timeHeure >= 24){
    timeJour = Math.floor(timeHeure/24)
    time = `${timeJour} ${timeJour > 1 ? "jours" : "jour"}`
  }

  if(timeJour >= 7){
    timeSemaine = Math.floor(timeJour/7)
    time = `${timeSemaine} ${timeSemaine > 1 ? "semaines" : "semaine"}`
  }

  return time
}

