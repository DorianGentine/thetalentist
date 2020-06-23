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
    const choices = [
      this.props.formValue.city != undefined && this.props.formValue.city.toLowerCase() == "paris" ? undefined : this.props.formValue.city,
      "Paris",
      "Nationale",
      "Internationale"
    ]
    return(
      <div className={setFormContainerClass(actualStep, 2)}>
        <MessageMagda text1={`C'est noté ! En habitant sur ${this.props.formValue.city || "Paris"}, es-tu ouvert à la mobilité ?`}/>
        <RadioForm name="next_aventure_attributes[mobilities_attributes][0][title]" choices={choices}/>
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.next_aventure_attributes.mobilities_attributes[0].title == undefined}>
          Étape suivante
        </button>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     stepForm: state.stepForm,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(null, null)(InscriptionForm2);
