import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import RadioForm from '../form/radioForm'
import MessageMagda from './messageMagda'


class InscriptionForm8 extends Component {
  render () {
    const actualStep = this.props.stepForm
    let choices = [
      "Immédiate",
      "-3 mois",
      "+3 mois"
    ]

    const handleClick = () => {
      this.props.switchStepFrom(actualStep)
    }

    return(
      <div className={setFormContainerClass(actualStep, 8)}>
        <MessageMagda
          text1={`Parfait ! Quelles sont tes disponibilités ?`}
        />
        <RadioForm name="availability" choices={choices} />
        <MessageMagda
          text1={`Si tu es encore en poste, tu peux répondre +3 mois`}
        />
        <button className="btn-violet-square margin-left-55" onClick={handleClick}>Étape suivante</button>
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
  return bindActionCreators({ switchStepFrom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm8);
