import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

// import RadioForm from '../form/radioForm'
import CheckBoxForm from '../form/checkBoxForm'
import MessageMagda from './messageMagda'


class InscriptionForm2 extends Component {

  render () {
    const actualStep = this.props.stepForm
    let firstChoice = this.props.formValue.city
    if(this.props.formValue.city != undefined){
      if(this.props.formValue.city.toLowerCase().includes("paris") || 
        this.props.formValue.city.toLowerCase().includes("bordeaux")){
        firstChoice = undefined
      } 
    }
    const choices = [
      firstChoice,
      "Paris",
      "Bordeaux",
      "Nationale",
      "Télétravail"
    ]
    return(
      <div className={setFormContainerClass(actualStep, 2)}>
        <MessageMagda text1={`C'est noté ! En habitant à ${this.props.formValue.city || "Paris"}, es-tu ouvert à la mobilité ? (3 choix maximum)`}/>
        <CheckBoxForm name="next_aventure_attributes[mobilities_attributes]" limit={3} choices={choices} formValue={this.props.formValue}/>
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.next_aventure_attributes.mobilities_attributes.length == 0}>
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
