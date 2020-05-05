import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import SelectForm from '../form/selectForm'
import MessageMagda from './messageMagda'


class InscriptionForm9 extends Component {
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
      <div className={setFormContainerClass(actualStep, 9)}>
        <MessageMagda
          text1={`Merci ! On va bientôt pouvoir examiner ton profil !`}
          text2={`Peux tu nous lister quelques-unes de tes compétences clés, qui font de toi un vrai pro dans ton métier ?`}
        />
        <SelectForm name="skill_ids" options={choices} />
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

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm9);
