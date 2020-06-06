import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';

import { fetchPost, fetchGET } from '../actions';
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
import InscriptionForm12 from '../containers/formStep/inscriptionForm12'

class InscriptionTalent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: { years: "0" },
      errors: {},
    }
  }

  componentDidMount() {
    this.props.fetchGET(`/api/v1/talents/${this.props.match.params.talent_id}`, "FETCH_TALENT")
  }

  render () {
    const step = Number(this.props.match.params.step)
    const showClg = true
    let talent = this.props.talent || null
    console.log('talent', talent)

    const valuesFilter = values => {
      const valuesToSend = {}
      // Met en page les skill_ids
      if(values.skill_ids && values.skill_ids.length > 0){
        values.skill_ids.map((skill, index) => {
          if(skill.id){
            values.skill_ids[index] = skill.id
          }else{
            values.skill_ids[index] = skill.value
          }
          console.log('skill', skill)
        })
        console.log('values.skill_ids', values.skill_ids)
      }
      // Met en page les known_ids
      if(values.known_ids && values.known_ids.length > 0){
          values.known_ids.map((known, index) => {
          if(known.id){
            values.known_ids[index] = known.id
          }else{
            values.known_ids[index] = known.value
          }
          console.log('known', known)
        })
        console.log('values.known_ids', values.known_ids)
      }
      Object.keys(values).forEach(value => {
        // if(values[value].length > 0 && values[value] !== this.state.initialValues[value]){
        if(values[value] !== this.state.initialValues[value]){
          valuesToSend[value] = values[value]
        }
      })
      return valuesToSend
    }
    
    const validate = values => {
      {showClg ? console.log('values', values) : null}
      if(values.skill_ids){
        console.log(values.skill_ids.length)
      }
      const errors = validationForm(values, step)
      if(Object.keys(errors).length < Object.keys(this.state.errors).length){
        this.setState({errors: errors})
      }
      return errors
    }
    
    const onSubmit = values => {
      const errors = validationForm(values, step)
      {showClg ? console.log('errors', errors) : null}
      if(Object.keys(errors).length > 0){
        this.setState({errors: errors})
        return errors
      }else{
        const valuesToSend = valuesFilter(values)
        
        // Met en page les jobs
        if(valuesToSend.talent_job_attributes.job_id){
          const jobs = valuesToSend.talent_job_attributes.job_id
          valuesToSend.talent_second_job_attributes.job_id = jobs[1]
          valuesToSend.talent_job_attributes.job_id = jobs[0]
        }
        // Met en page les waiting_for
        if(typeof valuesToSend.next_aventure_attributes.waiting_for_one == "object"){
          const nAA = valuesToSend.next_aventure_attributes
          const waitingFor = valuesToSend.next_aventure_attributes.waiting_for_one
          nAA.waiting_for_three = waitingFor[2]
          nAA.waiting_for_two = waitingFor[1]
          nAA.waiting_for_one = waitingFor[0]
        }
        // FIN

        Object.keys(valuesToSend).forEach(value => {
          this.setState(prevState => {
            prevState.initialValues[value] = valuesToSend[value]
          })
        })
        // {showClg ? console.log('valuesToSend', valuesToSend) : null}
        if(Object.keys(valuesToSend).length > 0){
          this.props.fetchPost(`/api/v1/talents/${this.props.match.params.talent_id}`, valuesToSend, "PATCH", 
            // this.props.fetchGET(`/api/v1/talents/${this.props.match.params.talent_id}`, "FETCH_TALENT")
          )
        }
        if(step < 12){
          this.props.history.push(`/talents/${this.props.match.params.talent_id}/welcome/${step + 1}`)
        }else{
          window.location = `/talents/${this.props.match.params.talent_id}`
        }
      }
    }

    let next_aventure, mobility, job, second_job
    let initialValues = { 
      next_aventure_attributes: {
        id: 0,
        mobilities_attributes: [{
          id: 0
        }]
      },
      talent_job_attributes: {
        id: 0,
        year: "0"
      },
      talent_second_job_attributes: {
        id: 0,
      }
    }
    if(talent){
      next_aventure = talent.next_aventure
      mobility = talent.mobilities[0]
      job = talent.job
      second_job = talent.second_job
      
      initialValues = {
        city: talent.talent.city,
        next_aventure_attributes: {
          id: next_aventure.id || 0,
          mobilities_attributes: [{
            id: mobility.id || 0
          }],
          availability: next_aventure.availability,
          remuneration: next_aventure.remuneration,
          waiting_for_one: next_aventure.waiting_for_one,
          waiting_for_two: next_aventure.waiting_for_two,
          waiting_for_three: next_aventure.waiting_for_three
        },
        talent_job_attributes: {
          id: job.id,
          year: job.year
        },
        talent_second_job_attributes: {
          id: second_job.id,
        }
      }
    }

    return(
      <div>
        <NavbarForm stepForm={step} talent_id={this.props.match.params.talent_id} />
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit} className="flex">
              {step == 1 || step == 2 ? <InscriptionForm1 submitting={submitting} stepForm={step} errors={this.state.errors} /> : null }
              {step >= 1 && step <= 3 ? <InscriptionForm2 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 2 && step <= 4 ? <InscriptionForm3 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 3 && step <= 5 ? <InscriptionForm4 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 4 && step <= 6 ? <InscriptionForm5 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 5 && step <= 7 ? <InscriptionForm6 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 6 && step <= 8 ? <InscriptionForm7 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 7 && step <= 9 ? <InscriptionForm8 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 8 && step <= 10 ? <InscriptionForm9 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 9 && step <= 11 ? <InscriptionForm10 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 10 && step <= 12 ? <InscriptionForm11 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {step >= 11 && step <= 13 ? <InscriptionForm12 formValue={values} submitting={submitting} stepForm={step} /> : null }
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
    talent: state.talent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionTalent);
