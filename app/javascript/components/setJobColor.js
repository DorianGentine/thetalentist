export default function setJobColor(job, jobs){
  let color
  if(jobs != null){
    jobs = jobs.jobs
    if(job.toLowerCase() === jobs[0].title.toLowerCase()){
      color = {
        backgroundColor: "#FCEBEB",
        color: "#FE7373",
      }
    }else if(job.toLowerCase() === jobs[1].title.toLowerCase()){
      color = {
        backgroundColor: "#DFDEFE",
        color: "#5F5DDA",
      }
    }else if(job.toLowerCase() === jobs[2].title.toLowerCase()){
      color = {
        backgroundColor: "#FFF7E2",
        color: "#FFAC4B",
      }
    }else if(job.toLowerCase() === jobs[3].title.toLowerCase()){
      color = {
        backgroundColor: "#EDF4FE",
        color: "#6A9FE2",
      }
    }else if(job.toLowerCase() === jobs[4].title.toLowerCase()){
      color = {
        backgroundColor: "#FCEBEB",
        color: "#FE7373",
      }
    }else if(job.toLowerCase() === jobs[5].title.toLowerCase()){
      color = {
        backgroundColor: "#DFDEFE",
        color: "#5F5DDA",
      }
    }
  }
  return color
}