import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';

import { fetchPost, switchStepFrom } from '../actions';
import validationForm from '../../components/validationInscriptionTalent';

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
  constructor(props) {
    super(props);
    this.state = {
      initialValues: { years: "0" },
      errors: {},
    }
  }

  render () {
    const step = this.props.stepForm

    const valuesFilter = values => {
      const valuesToSend = {}
      Object.keys(values).forEach(value => {
        if(values[value] !== this.state.initialValues[value]){
          valuesToSend[value] = values[value]
        }
      })
      return valuesToSend
    }
    
    const validate = values => {
      console.log('values', values)
      const errors = validationForm(values, step)
      if(Object.keys(errors).length < Object.keys(this.state.errors).length){
        this.setState({errors: errors})
      }
      return errors
    }

    const onSubmit = values => {
      const errors = validationForm(values, step)
      console.log('errors', errors)
      if(Object.keys(errors).length > 0){
        this.setState({errors: errors})
        return errors
      }else{
        const valuesToSend = valuesFilter(values)
        Object.keys(valuesToSend).forEach(value => {
          this.setState(initialValues => {initialValues[value] = valuesToSend[values]})
        })
        console.log('initialValues', this.state.initialValues)
        this.props.switchStepFrom(step)
        // this.props.fetchPost(`/api/v1/talents/${"id"}`, valuesToSend, "PATCH", () => {
        //   this.props.switchStepFrom(step)
        // })
      }
    }

    return(
      <div>
        <NavbarForm />
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={{ years: "0" }}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit} className="flex">
              {step == 1 || step == 2 ? <InscriptionForm1 submitting={submitting} errors={this.state.errors} /> : null }
              {step >= 1 && step <= 3 ? <InscriptionForm2 formValue={values} submitting={submitting} /> : null }
              {step >= 2 && step <= 4 ? <InscriptionForm3 formValue={values} submitting={submitting} /> : null }
              {step >= 3 && step <= 5 ? <InscriptionForm4 formValue={values} submitting={submitting} /> : null }
              {step >= 4 && step <= 6 ? <InscriptionForm5 formValue={values} submitting={submitting} /> : null }
              {step >= 5 && step <= 7 ? <InscriptionForm6 formValue={values} submitting={submitting} /> : null }
              {step >= 6 && step <= 8 ? <InscriptionForm7 formValue={values} submitting={submitting} /> : null }
              {step >= 7 && step <= 9 ? <InscriptionForm8 formValue={values} submitting={submitting} /> : null }
              {step >= 8 && step <= 10 ? <InscriptionForm9 formValue={values} submitting={submitting} /> : null }
              {step >= 9 && step <= 11 ? <InscriptionForm10 formValue={values} submitting={submitting} /> : null }
              {step >= 10 && step <= 12 ? <InscriptionForm11 formValue={values} submitting={submitting} /> : null }
            </form>
          )}
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
  return bindActionCreators({ fetchPost, switchStepFrom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionTalent);
