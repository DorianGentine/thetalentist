import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { switchStepFrom, fetchGET } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import RangeForm from '../form/rangeForm'
import MessageMagda from './messageMagda'


class InscriptionForm3 extends Component {
  render () {
    const actualStep = this.props.stepForm
    const formStep = 4

    const handleClick = () => {
      this.props.switchStepFrom(actualStep)
    }

    return(
      <div className={setFormContainerClass(actualStep, formStep)}>
        <MessageMagda text1={`Très bien ! Combien d'années d'expérience as-tu dans ce corps de métier ? (hors stage)`}/>
        <RangeForm name="years" max={30} formValue={this.props.formValue} />
        <button className="btn-violet-square margin-left-55" onClick={handleClick}>Étape suivante</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    stepForm: state.stepForm,
    jobs: state.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ switchStepFrom, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm3);
