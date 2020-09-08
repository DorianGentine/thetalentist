import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import RadioForm from '../form/radioForm'
import MessageMagda from './messageMagda'


class InscriptionForm7 extends Component {
  render () {
    const actualStep = this.props.stepForm
    let choices = [
      "-30k€",
      "30k€ à 40k€",
      "40k€ à 50k€",
      "50k€ à 60k€",
      "60 à 70k€",
      "70 à 80k€",
      "80 à 90k€",
      "90 à 100k€",
      "100 à 150k€",
      "+150k€"
    ]

    return(
      <div className={setFormContainerClass(actualStep, 7)}>
        <MessageMagda
          text1={`Quelles sont tes prétentions salariales ? (package en K€ annuel brut)`}
        />
        <RadioForm name="next_aventure_attributes[remuneration]" choices={choices} />
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.next_aventure_attributes.remuneration == undefined}>
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

export default connect(null, null)(InscriptionForm7);
