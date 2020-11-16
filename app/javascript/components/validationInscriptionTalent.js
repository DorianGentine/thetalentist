export default function validationForm(values, step){
  const errors = {}
  if(step == 1){
    if(!values.city){
      errors.city = "Vous devez indiquer votre ville"
    }
  }
  if(step == 12){
    console.log('step', step)
    errors.linkedin = "ça c'est bon !"
  }

  return errors
}