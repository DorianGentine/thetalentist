import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

import { fetchPost } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import InputForm from '../form/inputForm'

class InscriptionForm12 extends Component {
  
  render () {
    const isMobile = this.props.isMobile
    const actualStep = this.props.stepForm
    const values = this.props.formValue
    const talent = this.props.talent
    let firstname = "  "
    if(talent != null){
      firstname = talent.talent.firstname
    }

    return(
      <div className={setFormContainerClass(actualStep, 12)}>
        <h2 className={`${isMobile ? "" : "margin-left-55 "}violet`}>Bravo {firstname} 👏</h2>
        <h3 className={`${isMobile ? "" : "margin-left-55 "}violet`}>Le formulaire est terminé !</h3>
        <p className={`${isMobile ? "" : "margin-left-55 "}margin-bottom-30 label-color`}>Merci d'avoir pris ces quelques minutes ! Ton profil a été envoyé à notre équipe, 
          qui te recontactera dans les 2 prochains jours, afin de t'accompagner dans ta prochaine aventure !
        </p>
        {/* <InputForm name="linkedin" title="Ton Linkedin" placeholder="https://www.linkedin.com/in..." /> */}
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.linkedin == undefined}>
          Accéder à mon profil
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    isMobile: state.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm12);
