import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import SelectForm from '../form/selectForm'
import MessageMagda from './messageMagda'


class InscriptionForm10 extends Component {
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
      <div className={setFormContainerClass(actualStep, 10)}>
        <MessageMagda
          text1={`Très bien ! Maintenant, peux-tu nous lister certains de tes savoir-être ? (Exemple: Curieux...)`}
        />
        <SelectForm name="known_ids" options={choices} />
        <MessageMagda
          text1={`N'hésites pas à mettre des éléments unique de ta personnalité, de ton caractère. Ils permettent de savoir comment tu peux evoluer au sein d'une équipe et d'une structure.`}
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

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm10);
