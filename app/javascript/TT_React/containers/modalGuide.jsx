import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeGuideSu, nextGuideSu, prevGuideSu, openModalTalent, closeModalTalent } from '../actions';

class ModalGuide extends Component {

  render () {
    const step = this.props.guideSu
    let titre, text, position, guideTextStyle

    if(step == 1) {
      titre = "Etape 1 : Répertoire"
      text = "Bienvenue dans le répertoire. C’est ici que tu découvriras les talents."
      position = {
        top: "22px",
        left: "1000px",
        zIndex: "25",
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
      <div className={`${step == 1 ? "fixed" : "absolute"} guide-su`} id={`guide-su-${step}`} style={position}>
        <div className="guide-point"></div>
        <div className="guide-text" style={guideTextStyle}>
          <div className="flex space-between">
            <h5 className="no-margin margin-bottom-15">{titre}</h5>
            <span className="black pointer" onClick={() => this.props.closeGuideSu()}>X</span>
          </div>
          <p>{text}</p>
          <hr className="ligne-horizontal no-margin"/>
          <div className="flex">
            <a className="flex-grow-1 padding-vertical-5 text-center bordure-droite" disabled={step == 1} onClick={prevStep}>Précédent</a>
            <a className="flex-grow-1 padding-vertical-5 text-center" onClick={step < 4 ? nextStep : ()=>{}} href={step == 4 ? `/conversations/${1}?query=new_member5` : false}>Suivant</a>
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeGuideSu, nextGuideSu, prevGuideSu, openModalTalent, closeModalTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalGuide);
