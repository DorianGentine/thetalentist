import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';

import { fetchPost } from '../actions';

import NavbarForm from '../containers/navbarForm'
import InscriptionForm1 from '../containers/formStep/inscriptionForm1'
import InscriptionForm2 from '../containers/formStep/inscriptionForm2'
import InscriptionForm3 from '../containers/formStep/inscriptionForm3'
import InscriptionForm4 from '../containers/formStep/inscriptionForm4'
import InscriptionForm5 from '../containers/formStep/inscriptionForm5'
import InscriptionForm6 from '../containers/formStep/inscriptionForm6'
import InscriptionForm7 from '../containers/formStep/inscriptionForm7'
import InscriptionForm8 from '../containers/formStep/inscriptionForm8'
import InscriptionForm9 from '../containers/formStep/inscriptionForm9'
import InscriptionForm10 from '../containers/formStep/inscriptionForm10'
import InscriptionForm11 from '../containers/formStep/inscriptionForm11'

class InscriptionTalent extends Component {

  render () {
    const step = this.props.stepForm

    const onSubmit = value => {
      console.log(value)
      this.props.fetchPost('api/v1/new_talent', value, "POST", () => {
        console.log('Submitted: DO SOMETHING NOW')
      })
    }

    const validate = value => {
      console.log("value:", value)
    }

    return(
      <div>
        <NavbarForm />
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit} className="flex">
              {step == 1 || step == 2 ? <InscriptionForm1 /> : null }
              {step >= 1 && step <= 3 ? <InscriptionForm2 formValue={values} /> : null }
              {step >= 2 && step <= 4 ? <InscriptionForm3 formValue={values} /> : null }
              {step >= 3 && step <= 5 ? <InscriptionForm4 formValue={values} /> : null }
              {step >= 4 && step <= 6 ? <InscriptionForm5 formValue={values} /> : null }
              {step >= 5 && step <= 7 ? <InscriptionForm6 formValue={values} /> : null }
              {step >= 6 && step <= 8 ? <InscriptionForm7 formValue={values} /> : null }
              {step >= 7 && step <= 9 ? <InscriptionForm8 formValue={values} /> : null }
              {step >= 8 && step <= 10 ? <InscriptionForm9 formValue={values} /> : null }
              {step >= 9 && step <= 11 ? <InscriptionForm10 formValue={values} /> : null }
              {step >= 10 && step <= 12 ? <InscriptionForm11 formValue={values} submitting={submitting} /> : null }
            </form>
          )}
          initialValues={{ years: "0" }}
        />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    stepForm: state.stepForm,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionTalent);
