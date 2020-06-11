import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import RangeForm from '../form/rangeForm'
import MessageMagda from './messageMagda'


class InscriptionForm4 extends Component {
  render () {
    const actualStep = this.props.stepForm

    return(
      <div className={setFormContainerClass(actualStep, 4)}>
        <MessageMagda text1={`Très bien ! Combien d'années d'expérience as-tu dans ce corps de métier ? (hors stage)`}/>
        <RangeForm name="talent_job_attributes[year]" max={20} formValue={this.props.formValue} />
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.talent_job_attributes.year == 0}>
          Étape suivante
        </button>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     jobs: state.jobs,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   // return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(null, null)(InscriptionForm4);
