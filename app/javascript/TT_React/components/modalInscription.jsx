import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { fetchPost, fetchGET } from '../actions';

import InputForm from '../containers/form/inputForm'

class modalInscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }
  }
  

  render() {

    const handleClick = e => {
      e.preventDefault()
      this.setState({opened: !this.state.opened})
      console.log("salut", this.state.opened)
    }

    const onSubmit = value => {
      console.log(value)
      // this.props.fetchPost('api/v1/new_talent', value, "POST", () => {
      //   console.log('Submitted: DO SOMETHING NOW')
      // })
    }

    const validate = value => {
      console.log("value:", value)
    }

    {/* <div className="modal-inscription-bg" onClick={handleClick}></div> */}
    const renderModal = () => {
      return(
        <div className="modal-inscription-position">
          <div className="modal-inscription">
            <h2 className="violet no-margin margin-bottom-20">S'inscrire</h2>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit, values, submitting }) => (
                <form className="row" onSubmit={handleSubmit}>
                  <InputForm title="Prénom" name="firstname" classList="col-md-6 margin-bottom-20" />
                  <InputForm title="Nom" name="last_name" classList="col-md-6 margin-bottom-20" />
                  <InputForm title="Email" name="email" classList="col-md-12 margin-bottom-20" />
                  <InputForm title="Mot de passe" name="encrypted_password" classList="col-md-6 margin-bottom-20" />
                  <InputForm title="Confirmer le mot de passe" name="encrypted_password" classList="col-md-6 margin-bottom-20" />
                  <InputForm title="Numéro de téléphone" name="phone" classList="col-md-12 margin-bottom-20" />
                  <label className="col-md-12 margin-bottom-30">
                    <Field component="input" name="terms_of_condition" type="checkbox" />
                    En vous inscrivant vous acceptez les Conditions d'utilisations et la Politique de confidentialité de The Talentist.
                  </label>
                  <div className="col-md-12">
                    <button className="btn-violet-square w-100" onClick={handleClick}>Commencer à compléter mon profil</button>
                  </div>
                </form>
              )}
            />
            <div className="modal-inscription-footer">
              <p className="no-margin">Vous avez déjà un compte ? <span className="pointer" onClick={handleClick}>Connectez-vous</span></p>
            </div>
          </div>
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
