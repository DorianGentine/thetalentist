import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { BrowserRouter as Redirect } from 'react-router-dom';

import { fetchPost, fetchGET } from '../actions';

import InputForm from '../containers/form/inputForm'

class modalInscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: true
    }
  }
  

  render() {
    const handleClick = e => {
      e.preventDefault()
      this.setState({opened: !this.state.opened})
    }

    const relocation = () => {
      window.location.replace('/talents/sign_up')
      // this.props.history.replace('/talents/sign_up')
    }
    
    const validate = value => {
      console.log("value:", value)
      const inputNames = [
        "firstname",
        "last_name",
        "email",
        "encrypted_password",
        "confirm",
        "phone"
      ]
      let errors = {}
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.email)){
        errors.email = "L'adresse mail n'est pas valide"
      }
      if (value.confirm !== value.encrypted_password) {
        errors.confirm = 'Vos mots de passe doivent correspondre'
      }
      if(!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value.phone)){
        errors.phone = "Le téléphone ne semble pas correct"
      }
      for (let i = 0; i < inputNames.length; i++) {
        const inputName = inputNames[i];
        if (!value[inputName]) {
          errors[inputName] = 'Requis'
        }
      } 
      if(!value.terms_of_condition){
        errors.terms_of_condition = "Vous devez accepter les CGU pour continuer"
      }
      return errors
    }

    const onSubmit = value => {
      console.log(value)
      const errors = validate(value)
      if(Object.keys(errors).length > 0){
        return errors
      }else{
        // this.props.fetchPost('/api/v1/talents/:id', value, "PATCH", () => {
        //   console.log('Submitted: DO SOMETHING NOW')
        // })
        relocation()
      }
    }

    const renderModal = () => {
      return(
        <div className="modal-inscription-position">
          <div className="modal-inscription">
            <h2 className="violet no-margin margin-bottom-20">S'inscrire</h2>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={{ terms_of_condition: true }}
              render={({ handleSubmit, values, submitting, submitError }) => (
                <form className="row" onSubmit={handleSubmit}>
                  <InputForm title="Prénom" name="firstname" classList="col-md-6 margin-bottom-20" />
                  <InputForm title="Nom" name="last_name" classList="col-md-6 margin-bottom-20" />
                  <InputForm title="Email" name="email" type="email" classList="col-md-12 margin-bottom-20" />
                  <InputForm title="Mot de passe" name="encrypted_password" type="password" classList="col-md-6 margin-bottom-20" />
                  <InputForm title="Confirmer le mot de passe" name="confirm" type="password" classList="col-md-6 margin-bottom-20" />
                  <InputForm title="Numéro de téléphone" name="phone" type="tel" classList="col-md-12 margin-bottom-20" />
                  <Field name="terms_of_condition" type="checkbox">
                    {({ input, meta }) => (
                      <label className="col-md-12 margin-bottom-30">
                          <input {...input} />
                          En vous inscrivant vous acceptez les Conditions d'utilisations et la Politique de confidentialité de The Talentist.
                          {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
                      </label>
                    )}
                  </Field>
                  <div className="col-md-12">
                    <button 
                      className="btn-violet-square w-100" 
                      type="submit" 
                      disabled={this.props.submitting}>
                        Commencer à compléter mon profil
                    </button>
                  </div>
                </form>
              )}
              />
            <div className="modal-inscription-footer">
              <p className="no-margin">Vous avez déjà un compte ? <span className="pointer" onClick={handleClick}>Connectez-vous</span></p>
            </div>
          </div>
          {/* <div className="modal-inscription-bg" onClick={handleClick}></div> */}
        </div>
      )
    }

    return (
      <div>
        <button className="form-btn form-btn-precedent" onClick={e=>handleClick(e)} >S'inscrire</button>
        {this.state.opened ? renderModal() : null}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     modalOpened: state.modalOpened,
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost, fetchGET }, dispatch);
}

export default connect(null, mapDispatchToProps)(modalInscription);
