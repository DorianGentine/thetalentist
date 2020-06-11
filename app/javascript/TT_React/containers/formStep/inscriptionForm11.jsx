import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import TextAreaForm from '../form/textAreaForm'
import MessageMagda from './messageMagda'


class InscriptionForm11 extends Component {
  render () {
    const actualStep = this.props.stepForm

    return(
      <div className={setFormContainerClass(actualStep, 11)}>
        <MessageMagda
          text1={`Allez ! Voici les 3 dernières questions qui permettentde te différencier, ce sont elles que les Start-ups voient en premier sur ton profil, alors mets le paquet !`}
        />
        <TextAreaForm
          name="next_aventure_attributes[see_my_job]"
          title="Comment je vois mon métier"
          placeholder="J'ai monté ma boite avec 2 associés..."
          maxlength="300"
          formValue={this.props.formValue}
        />
        <TextAreaForm
          name="next_aventure_attributes[good_manager]"
          title="Un bon manager c'est"
          maxlength="300"
          formValue={this.props.formValue}
        />
        <TextAreaForm
          name="next_aventure_attributes[looking_for]"
          title="Ce que je recherche"
          maxlength="300"
          formValue={this.props.formValue}
        />
        <MessageMagda
          text1={`En cliquant sur "Soumettre mon profil", ton formulaire sera envoyé à notre équipe. Tu pourras modifier ces informations à tout moment depuis ton profil, une fois sur la pateforme.`}
        />
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || 
            this.props.formValue.next_aventure_attributes.see_my_job == undefined ||
            this.props.formValue.next_aventure_attributes.good_manager == undefined ||
            this.props.formValue.next_aventure_attributes.looking_for == undefined
          }>
          Soumettre mon profil
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

export default connect(null, null)(InscriptionForm11);
