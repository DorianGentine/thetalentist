export default function validationForm(values, step){
  const errors = {}
  if(step == 1){
    if(!values.city){
      errors.city = "Vous devez indiquer votre ville"
    }
  }
  return errors
}