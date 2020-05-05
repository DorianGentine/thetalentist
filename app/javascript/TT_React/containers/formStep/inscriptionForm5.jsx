import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import CheckBoxForm from '../form/checkBoxForm'
import MessageMagda from './messageMagda'


class InscriptionForm5 extends Component {
  render () {
    const actualStep = this.props.stepForm
    const formStep = 5
    let choices = [
      "Saas",
      "Marketplace",
      "IOT",
      "Finance",
      "Conseil",
      "Big data",
      "Innovation",
      "E-commerce",
      "Com/pub",
      "Mobile"
    ]

    const handleClick = () => {
      this.props.switchStepFrom(actualStep)
    }

    return(
      <div className={setFormContainerClass(actualStep, formStep)}>
        <MessageMagda
          text1={`Nickel ! Tu peux maintenant ajouter jusqu'à 3 secteurs d'activité, et ainsi davantage cibler ta recherche.`}
          text2={`Quels sont les secteurs que tu privilégies ?`}
        />
        <CheckBoxForm name="sectors" limit={3} choices={choices} formValue={this.props.formValue}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm5);
