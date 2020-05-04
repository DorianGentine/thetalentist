import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { switchStepFrom } from '../actions';
import mainLogo from'../../../assets/images/Logo The talentist-01.png';

class NavbarForm extends Component {
  render () {
    const step = this.props.stepForm

    const handleClick = () => {
      if(step > 0 ){
        this.props.switchStepFrom(step, "sub")
      }
    }
    return(
      <div style={{height: "70px"}}>
        <div className="navbar-wagon light-gray-background">
          <a className="navbar-wagon-item navbar-wagon-link" onClick={handleClick} href={step == 0 ? "/" : null}>&#8617; Retour</a>
          <a href="/" className="navbar-talentist-logo">
            <img src={mainLogo} style={{height: "50px"}} alt="Logo talentist"/>
          </a>
          <a href="/" className="navbar-wagon-item navbar-wagon-link">Sauvegarder et quitter</a>
        </div>
        <hr className="progression-bar" style={{width: `${(step/8)*100}%`}}/>
      </div>
    );
  }
};



function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
    stepForm: state.stepForm,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ switchStepFrom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarForm);
