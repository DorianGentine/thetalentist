import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import CheckBoxForm from '../form/checkBoxForm'
import MessageMagda from './messageMagda'


class InscriptionForm3 extends Component {

  componentDidMount(){
    if (this.props.jobs === null) {
      this.props.fetchGET('/api/v1/jobs', "FETCH_JOBS")
    }
  }


  render () {
    const actualStep = this.props.stepForm
    let jobs = this.props.jobs
    if(jobs != null){
      jobs = jobs.jobs
    }

    return(
      <div className={setFormContainerClass(actualStep, 3)}>
        <MessageMagda text1={`Parfait ! Quels types de métiers t'intéressent ? (Métier principal / métier secondaire)`}/>
        <CheckBoxForm name="talent_job_attributes[job_id]" limit={2} choices={jobs} formValue={this.props.formValue}/>
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.talent_job_attributes.job_id.length == 0}>
          Étape suivante
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm3);
