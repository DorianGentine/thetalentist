import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { switchStepFrom } from '../actions';
import mainLogo from'../../../assets/images/Logo The talentist-01.png';

class NavbarForm extends Component {
  render () {
    const step = this.props.stepForm

    return(
      <div>
        <div className="navbar-wagon light-gray-background">
          {step == 1 ?
            <a className="navbar-wagon-item navbar-wagon-link" href="/">&#8617; Retour</a>
          :
            <Link className="navbar-wagon-item navbar-wagon-link" to={`/talents/${this.props.talent_id}/welcome/${step - 1}`}>&#8617; Retour</Link>
          }
          <a href="/" className="navbar-talentist-logo">
            <img src={mainLogo} style={{height: "50px"}} alt="Logo talentist"/>
          </a>
          <a href="/" className="navbar-wagon-item navbar-wagon-link">Sauvegarder et quitter</a>
        </div>
        <hr className="progression-bar" style={{width: `${step == 12 ? 0 : (step/11)*100}%`} }/>
      </div>
    );
  }
};



function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(mapStateToProps, null)(NavbarForm);
