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
      envelope: ["fas", "envelope-open"],
      chevron: ["fas", "chevron-down"],
    };
  }

  componentDidMount(){
    this.props.fetchGET('/api/v1/current_user', "FETCH_USER")

    if(this.state.user && this.state.user.count_unread_message != 0){
      this.setState({envelope: ["fas", "envelope"]})
    }
  }

  render () {
    const path = this.props.path
    let user, userType, userId, convUrl, firstName, fullName, image = null, unreadMessages
    if(this.props.user != null){
      user = this.props.user
      userType = user.is_a_model
      userId = user.id
      convUrl = user.url.conv
      firstName = user.firstname
      fullName = user.full_name
      image = user.photo
      unreadMessages = user.count_unread_message
    }

    const toggleChevron = () => {
      console.log(this.state.chevron[1])
      if(this.state.chevron[1] == "chevron-down"){
        this.setState({chevron: ["fas", "chevron-up"]})
      }else{
        this.setState({chevron: ["fas", "chevron-down"]})
      }
    }
    // <p className="notif" title="Pensez à compléter votre profil !"></p>

    return(
      <div className="navbar-wagon">
        <a href="/" className="navbar-talentist-logo">
          <img src={mainLogo} style={{height: "50px"}} alt="Logo talentist"/>
        </a>
        {userType == "Recruteur" ?
          <div className="navbar-talentist-right hidden-xs hidden-sm">
            <a href="/repertoire?query=new_member" className="navbar-wagon-item navbar-wagon-link">
              <FontAwesomeIcon icon={["far", "question-circle"]}/>
            </a>
            <a className="navbar-wagon-item navbar-wagon-link" href="/repertoire">RÉPERTOIRE</a>

            <hr className="ligne-vertical white-background margin-left-30 margin-right-30" style={{height: "30px"}} />

            <div className="lien-messagerie relative">
              <a className={`navbar-wagon-item navbar-wagon-link${path == "conv" ? " active" : null}`} href={convUrl}>
                <FontAwesomeIcon icon={this.state.envelope}/>
                {unreadMessages != 0 ?
                  <div className="notif" title={`${unreadMessages} non lus`}></div>
                : null}
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
            <div className="navbar-wagon-item" >
              <div className="dropdown" onClick={toggleChevron}>
                {image != null ?
                  <div className="flex dropdown-toggle" id="navbar-wagon-menu" data-toggle="dropdown">
                    <img className="photo-conv" src={image} alt="avatar"></img>
                    <p className="white align-center no-margin">{`Hi, ${firstName}`}</p>
                    <FontAwesomeIcon className="white align-center font-12 margin-left-5" icon={this.state.chevron}/>
                  </div>
                  :
                  <div className="flex dropdown-toggle" id="navbar-wagon-menu" data-toggle="dropdown">
                    <div className="photo-conv">{fullName.slice(0, 1)}</div>
                    <p className="white align-center no-margin">{`Hi, ${firstName}`}</p>
                    <FontAwesomeIcon className="white align-center font-12 margin-left-5" icon={this.state.chevron}/>
                  </div>
                }
                <ul className="dropdown-menu dropdown-menu-right navbar-wagon-dropdown-menu">
                  <li>
                    <a className={`navbar-wagon-item navbar-wagon-link${path == "profil" ? " active" : ""}`} href={`/headhunters/${userId}`}>
                      Mon profil
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
                          <a className="white flex-grow-1 padding-vertical-5 text-center bordure-droite-white" href={`${convUrl}?query=new_member5`}>Précédent</a>
                          <a className="white flex-grow-1 padding-vertical-5 text-center close_guide_6">Fermer</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href={`/headhunters/${userId}/edit`}>
                      Editer mon compte
                    </a>
                  </li>
                  <li>
                    <a href="/headhunters/edit">
                      Configuration
                    </a>
                  </li>
                  <li>
                    <a rel="nofollow" data-method="delete" href="/headhunters/sign_out">
                      Déconnexion
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
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
