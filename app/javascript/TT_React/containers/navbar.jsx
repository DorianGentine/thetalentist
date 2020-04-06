import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET } from '../actions';
import mainLogo from'../../../assets/images/Logo The talentist-02.png';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false,
      intervalMessages: null,
    };
  }

  componentDidMount(){
    this.props.fetchGET('/api/v1/conversations', "FETCH_CONVERSATIONS")
  }

  render () {
    const userType = this.props.userType
    const userId = this.props.userId
    const conversations = this.props.conversations
    let lastConvUrl = "/conversations"
    let image
    let fullName = "Boris Test"
    if(conversations.length != 0){
      lastConvUrl = `/conversations/${conversations.conversations[0].conversation_id}`
    }

    const openDropdown = () => {
      if(this.state.opened){
        this.setState({opened: false})
      }else{
        this.setState({opened: true})
      }
    }

    return(
      <div className="navbar-wagon">
        <a href="/" className="navbar-talentist-logo">
          <img src={mainLogo} style={{height: "50px"}} alt="Logo talentist"/>
        </a>
        {userType == "Headhunter" ?
          <div className="navbar-talentist-right hidden-xs hidden-sm">
            <a href="/repertoire?query=new_member" className="navbar-wagon-item navbar-wagon-link">
              <FontAwesomeIcon icon={["far", "question-circle"]}/>
            </a>
            <a className="navbar-wagon-item navbar-wagon-link" href="/repertoire">
              <FontAwesomeIcon icon={["fas", "user-friends"]}/> RÉPERTOIRE
            </a>
            <div className="lien-messagerie relative">
              <a className="navbar-wagon-item navbar-wagon-link" href={lastConvUrl}>
                <FontAwesomeIcon icon={["fas", "envelope"]}/> MESSAGERIE
              </a>
              <div className="fixed guide-su" id="guide-su-5">
                <div className="guide-point"></div>
                <div className="guide-text">
                  <div className="flex space-between">
                    <h5 className="no-margin margin-bottom-15">Etape  5 : Messagerie</h5>
                    <span className="black pointer" id="close_guide_5">X</span>
                  </div>
                  <p>Bienvenue dans la messagerie. C’est le lieu d’échange avec les candidats, une fois que ceux-ci ont accepté ta demande de mise en relation. Si tu as la moindre question sur la plateforme, n’hésite pas à nous écrire, on est dispos !</p>
                  <hr className="ligne-horizontal no-margin white-background" />
                  <div className="flex">
                    <a className="white flex-grow-1 padding-vertical-5 text-center bordure-droite-white" href="/repertoire?query=new_member">Précédent</a>
                    <a className="white flex-grow-1 padding-vertical-5 text-center" href={`/headhunters/${userId}?query=new_member6`}>Suivant</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lien-messagerie relative">
              <a className="navbar-wagon-item navbar-wagon-link" href={`/headhunters/${userId}`}>
                <FontAwesomeIcon icon={["fas", "user"]}/> PROFIL
                  <p className="notif" title="Pensez à compléter votre profil !"></p>
              </a>
              <div className="fixed guide-su" id="guide-su-6">
                <div className="guide-point"></div>
                <div className="guide-text">
                  <div className="flex space-between">
                    <h5 className="no-margin margin-bottom-15">Etape 6 : Profil</h5>
                    <span className="black pointer close_guide_6">X</span>
                  </div>
                  <p>Enfin, voici ton profil : plus il est complet, plus ton entreprise est attractive auprès des talents !</p>
                  <hr className="ligne-horizontal no-margin white-background" />
                  <div className="flex">
                    <a className="white flex-grow-1 padding-vertical-5 text-center bordure-droite-white" href={`${lastConvUrl}?query=new_member5`}>Précédent</a>
                    <a className="white flex-grow-1 padding-vertical-5 text-center close_guide_6">Fermer</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-wagon-item">
              <div className="dropdown">
                  {image != null ? <img className="photo-conv dropdown-toggle" id="navbar-wagon-menu" data-toggle="dropdown" src={image} alt="avatar"></img> : <div className="photo-conv dropdown-toggle" id="navbar-wagon-menu" data-toggle="dropdown">{fullName.slice(0, 1)}</div>}
                <ul className="dropdown-menu dropdown-menu-right navbar-wagon-dropdown-menu">
                  <li>
                    <a href={`/headhunters/${userId}/edit`}>
                      <FontAwesomeIcon icon={["fas", "sliders-h"]}/> Editer mon compte
                    </a>
                  </li>
                  <li>
                    <a href="/headhunters/edit">
                      <FontAwesomeIcon icon={["fas", "cogs"]}/> Configuration
                    </a>
                  </li>
                  <li>
                    <a rel="nofollow" data-method="delete" href="/headhunters/sign_out">
                      <FontAwesomeIcon icon={["fas", "sign-out-alt"]}/>  Log out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        : null}
      </div>
    );
  }
};



function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    userType: state.userType,
    userId: state.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
