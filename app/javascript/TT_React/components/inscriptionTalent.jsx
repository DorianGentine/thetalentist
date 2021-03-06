import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';

import { fetchPost, fetchGET, updateTalent } from '../actions';
import validationForm from '../../components/validationInscriptionTalent';
import valuesToSendFilter from '../../components/valuesToSendFilter';

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
      initialValues: { 
        next_aventure_attributes: {
          id: 0,
          sector_ids: [],
          waiting_for_one: [],
          mobilities_attributes: []
        },
        skill_ids: [],
        known_ids: [],
        talent_job_attributes: {
          id: 0,
          job_id: [],
          year: "0"
        },
        talent_second_job_attributes: {
          id: 0,
        }
      },
    }
  }
  
  setInitialvalues = promise => {
    let jobsId = [], waitingForOnes = [], mobilitiesTitles = []
    let talent = promise
    let city = talent.talent.city
    let linkedin = talent.talent.linkedin
    let next_aventure = talent.next_aventure
    let mobilities = talent.mobilities
    let job = talent.job
    let second_job = talent.second_job
    let secondJobId = null
    let skills = talent.skills
    let knowns = talent.knowns
    let sectorIds = talent.sector_ids
    if(job.job_id){
      jobsId[0] = job.job_id
    }
    if(second_job && second_job.job_id){
      secondJobId = second_job.id
      jobsId[1] = second_job.job_id
    }
    if(next_aventure.waiting_for_one){
      waitingForOnes[0] = next_aventure.waiting_for_one
    }
    if(next_aventure.waiting_for_two){
      waitingForOnes[1] = next_aventure.waiting_for_two
    }
    if(next_aventure.waiting_for_three){
      waitingForOnes[2] = next_aventure.waiting_for_three
    }
    mobilities.map((mobility, index) => {
      mobilitiesTitles[index] = mobility.title
    })
    skills.map((skill) => {
      skill.label = skill.title
      skill.value = skill.id
    })
    knowns.map((known) => {
      known.label = known.title
      known.value = known.id
    })

    const initialValues = {
      city: city,
      linkedin: linkedin,
      skill_ids: skills,
      known_ids: knowns,
      next_aventure_attributes: {
        id: next_aventure.id,
        mobilities_attributes: mobilitiesTitles.length != 0 ? mobilitiesTitles : mobilities,
        availability: next_aventure.availability,
        good_manager: next_aventure.good_manager,
        looking_for: next_aventure.looking_for,
        remuneration: next_aventure.remuneration,
        sector_ids: sectorIds,
        see_my_job: next_aventure.see_my_job,
        waiting_for_one: waitingForOnes
      },
      talent_job_attributes: {
        id: job.id,
        job_id: jobsId,
        year: job.year
      },
      talent_second_job_attributes: {
        id: secondJobId,
      }
    }
    this.setState({ initialValues: initialValues })
  }
  
  componentDidMount() {
    this.props.fetchGET(`/api/v1/talents/${this.props.match.params.talent_id}`, "FETCH_TALENT", promise => {
      this.setInitialvalues(promise)
    })
  }

  render () {
    const step = Number(this.props.match.params.step)
    
    const validate = values => {
      const errors = validationForm(values, step)
      return errors
    }
    
    const onSubmit = values => {
      const errors = validationForm(values, step)
      if(Object.keys(errors).length > 0){
        this.setState({errors: errors})
        return errors
      }else{
        const infos = {
          values: values,
          initialValues: this.state.initialValues,
          step: step,
          talent: this.props.talent,
        }
        const valuesToSend = valuesToSendFilter(infos)
        if(Object.keys(valuesToSend).length > 0){
          this.props.fetchPost(`/api/v1/talents/${this.props.match.params.talent_id}`, valuesToSend, "PATCH", promise => {
            console.log('promise', promise)
            this.props.updateTalent(promise)
            this.setInitialvalues(promise)
          })
        }
        if(step < 12){
          this.props.history.push(`/talents/${this.props.match.params.talent_id}/welcome/${step + 1}`)
        }else{
          window.location = `/talents/${this.props.match.params.talent_id}`
        }
      }
    }

    const checkStep = (step, formStep) => {
      if(step > formStep - 2 && step < formStep + 2){
        return true
      }else{
        return false
      }
    }

    return(
      <div>
        <NavbarForm stepForm={step} talent_id={this.props.match.params.talent_id} />
        <Form
          style={{marginTop: "70px"}}
          onSubmit={onSubmit}
          validate={validate}
          initialValues={this.state.initialValues}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit} className="flex">
              {checkStep(step, 1) ? <InscriptionForm1 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 2) ? <InscriptionForm2 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 3) ? <InscriptionForm3 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 4) ? <InscriptionForm4 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 5) ? <InscriptionForm5 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 6) ? <InscriptionForm6 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 7) ? <InscriptionForm7 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 8) ? <InscriptionForm8 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 9) ? <InscriptionForm9 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 10) ? <InscriptionForm10 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 11) ? <InscriptionForm11 formValue={values} submitting={submitting} stepForm={step} /> : null }
              {checkStep(step, 12) ? <InscriptionForm12 formValue={values} submitting={submitting} stepForm={step} /> : null }
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
  return bindActionCreators({ fetchPost, fetchGET, updateTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionTalent);
