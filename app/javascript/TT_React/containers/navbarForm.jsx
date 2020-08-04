import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { switchStepFrom } from '../actions';
import mainLogo from'../../../assets/images/Logo The talentist-01.png';

class NavbarForm extends Component {
  render () {
    const step = this.props.stepForm
    const isMobile = this.props.isMobile

    return(
      <div>
        <div className="navbar-wagon light-gray-background" style={{maxWidth: "100vw"}}>
          {step == 1 ?
            <a className="navbar-wagon-item navbar-wagon-link" href="/">
              <FontAwesomeIcon icon={["fas", "arrow-left"]}/>{isMobile ? "" : " Retour"}
            </a>
          :
          <Link className="navbar-wagon-item navbar-wagon-link" to={`/talents/${this.props.talent_id}/welcome/${step - 1}`}>
              <FontAwesomeIcon icon={["fas", "arrow-left"]}/>{isMobile ? "" : " Retour"}
            </Link>
          }
          <a href="/" className="navbar-talentist-logo">
            <img src={mainLogo} style={isMobile ? {maxHeight: "30px"} : {maxHeight: "50px"}} alt="Logo talentist"/>
          </a>
          <a href="/" className="navbar-wagon-item navbar-wagon-link">
            <FontAwesomeIcon icon={["far", "save"]}/>{isMobile ? "" : " Sauvegarder et quitter"}
          </a>
        </div>
        <hr className="progression-bar" style={{width: `${step == 12 ? 0 : (step/11)*100}%`, maxWidth: "100vw"}}/>
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
