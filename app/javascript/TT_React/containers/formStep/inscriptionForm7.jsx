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
    const formStep = 7
    let choices = [
      "-30k€",
      "30k€ à 40k€",
      "40k€ à 50k€",
      "50k€ à 60k€",
      "+60k€"
    ]

    return(
      <div className={setFormContainerClass(actualStep, formStep)}>
        <MessageMagda
          text1={`Quels sont tes prétentions salariales ? (en k€ annuelle brut) `}
        />
        <RadioForm name="remuneration" choices={choices} />
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

export default connect(mapStateToProps, null)(InscriptionForm7);
