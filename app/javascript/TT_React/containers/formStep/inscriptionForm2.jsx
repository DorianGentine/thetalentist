import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import RadioForm from '../form/radioForm'
import MessageMagda from './messageMagda'


class InscriptionForm2 extends Component {

  render () {
    const actualStep = this.props.stepForm
    const formStep = 2
    const choices = [
      this.props.formValue.city != undefined && this.props.formValue.city.toLowerCase() == "paris" ? undefined : this.props.formValue.city,
      "Paris",
      "Nationale",
      "Internationale"
    ]

    return(
      <div className={setFormContainerClass(actualStep, formStep)}>
        <MessageMagda text1={`Ok c'est noté ! En habitant sur ${this.props.formValue.city || "Paris"} tu restes ouvert à la mobilité ?`}/>
        <RadioForm name="mobilities" choices={choices}/>
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting}>
          Étape suivante
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    stepForm: state.stepForm,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(mapStateToProps, null)(InscriptionForm2);
