export default function setJobColor(job, jobs){
  let color = {backgroundColor: "#E5E6ED", color: "#273243"}
  const colors = [
    {
      backgroundColor: "#DFDEFE",
      color: "#5F5DDA",
    },{
      backgroundColor: "#FFF7E2",
      color: "#FFAC4B",
    },{
      backgroundColor: "#EDF4FE",
      color: "#6A9FE2",
    },{
      backgroundColor: "#FCEBEB",
      color: "#FE7373",
    },{
      backgroundColor: "#E5FED5",
      color: "#86C05B",
    },{
      backgroundColor: "#FBEBEA",
      color: "#FE7371",
    }
  ]
  if(jobs != null){
    jobs = jobs.jobs
    for (let i = 0; i < jobs.length; i++) {
      if(job.toLowerCase() === jobs[i].title.toLowerCase()){
        color = colors[i]
      }
    }
    if(job.toLowerCase().includes("market")){
      color = colors[1]
    }else if(job.toLowerCase().includes("sales")){
      color = colors[5]
    }else if(job.toLowerCase().includes("prod")){
      color = colors[4]
    }
  }
  return color
}