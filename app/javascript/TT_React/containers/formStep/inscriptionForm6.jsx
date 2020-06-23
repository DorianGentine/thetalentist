import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import CheckBoxForm from '../form/checkBoxForm'
import MessageMagda from './messageMagda'


class InscriptionForm6 extends Component {
  render () {
    const actualStep = this.props.stepForm
    let choices = [
      "Ambiance",
      "International",
      "Produit",
      "Rémunération",
      "Valeurs",
      "Sens",
      "Mission",
      "Management",
      "Impact",
      "Worklife balance"
    ]

    return(
      <div className={setFormContainerClass(actualStep, 6)}>
        <MessageMagda
          text1={`Parfait !`}
          text2={`À présent, je t’invite à nous donner les 3 enjeux les plus importants pour ton prochain environnement de travail :`}
        />
        <CheckBoxForm name="next_aventure_attributes[waiting_for_one]" limit={3} choices={choices} formValue={this.props.formValue}/>
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.next_aventure_attributes.waiting_for_one.length == 0}>
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

export default connect(null, null)(InscriptionForm6);
