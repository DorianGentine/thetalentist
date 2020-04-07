import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeGuideSu, nextGuideSu, prevGuideSu, openModalTalent, closeModalTalent } from '../actions';

class ModalGuide extends Component {

  render () {
    const step = this.props.guideSu
    let titre, text, position, guideTextStyle, guidePointStyle

    if(step == 1) {
      titre = "Etape 1 : Répertoire"
      text = "Bienvenue dans le répertoire. C’est ici que tu découvriras les talents."
      position = {
        top: "-3px",
        left: "50%",
        zIndex: "25",
        minWidth: "300px",
        transform: "translateX(-11px)",
      }
    }else if(step == 2){
      titre = "Etape 2 : Filtres"
      text = "Filtre les talents pour mieux cibler ta recherche"
      position = {
        top: "8px",
        left: "30px",
        right: "-30px",
        zIndex: "10",
      }
    }else if(step == 3){
      titre = "Etape 3"
      text = "Ici, tu peux en apprendre plus sur le talent, et le contacter si tu le souhaites !"
      position = {
        zIndex: "10",
        left: "50%",
        right: "-50%",
      }
    }else if(step == 4){
      titre = "Etape 4"
      text = "Pour entrer en contact avec un talent c'est ici"
      position = {
        zIndex: "10",
        top: "15px",
        left: "calc(100% - 100px)",
      }
      guideTextStyle = {
        marginLeft: "-160px",
      }
    }else if(step == 5){
      titre = "Etape  5 : Messagerie"
      text = "Bienvenue dans la messagerie. C’est le lieu d’échange avec les candidats, une fois que ceux-ci ont accepté ta demande de mise en relation. Si tu as la moindre question sur la plateforme, n’hésite pas à nous écrire, on est dispos !"
      position = {
        zIndex: "10",
        top: "-3px",
        right: "0",
        minWidth: "300px"
      }
      guidePointStyle = {
        marginLeft: "auto",
        marginRight: "12px",
      }
    }else if(step == 6){
      titre = "Etape 6 : Profil"
      text = "Enfin, voici ton profil : plus il est complet, plus ton entreprise est attractive auprès des talents !"
      position = {
        zIndex: "10",
        top: "18px",
        right: "0",
        minWidth: "300px"
      }
      guidePointStyle = {
        marginLeft: "auto",
        marginRight: "20px",
      }
    }

    const prevStep = () => {
      if(step == 4){
        this.props.closeModalTalent(this.props.talents.talents[0])
        setTimeout(() => {
          this.props.prevGuideSu(step)
        }, 500);
      }else{
        this.props.prevGuideSu(step)
      }
    }

    const nextStep = () => {
      if(step == 3){
        this.props.openModalTalent(this.props.talents.talents[0])
        setTimeout(() => {
          this.props.nextGuideSu(step)
        }, 500);
      }else{
        this.props.nextGuideSu(step)
      }
    }

    return(
      <div className="absolute guide-su" id={`guide-su-${step}`} style={position}>
        <div className="guide-point" style={guidePointStyle}></div>
        <div className="guide-text" style={guideTextStyle}>
          <div className="flex space-between">
            <h5 className="no-margin margin-bottom-15">{titre}</h5>
            <span className="white pointer" onClick={() => this.props.closeGuideSu()}>X</span>
          </div>
          <p>{text}</p>
          <hr className="ligne-horizontal no-margin white-background"/>
          <div className="flex">
            <a
              className="white flex-grow-1 padding-vertical-5 text-center bordure-droite-white"
              disabled={step == 1}
              onClick={step < 5 ? prevStep : () => {}}
              href={step == 5 ? `/repertoire?query=new_member4` : step == 6 ? `${this.props.user.url.conv}?query=new_member` : undefined}>
              Précédent
            </a>
            <a
              className="white flex-grow-1 padding-vertical-5 text-center"
              onClick={step < 4 ? nextStep : step == 6 ? this.props.closeGuideSu : ()=>{}}
              href={step == 4 ? `${this.props.user.url.conv}?query=new_member` : step == 5 ? `${this.props.user.url.profil}?query=new_member` : undefined}>
              {step == 6 ? "Fermer" : "Suivant"}
            </a>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    guideSu: state.guideSu,
    talents: state.talents,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeGuideSu, nextGuideSu, prevGuideSu, openModalTalent, closeModalTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalGuide);
