import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { switchStepFrom } from '../actions';

import InputForm from './form/inputForm'
import MessageMagda from './messageMagda'


class InscriptionForm1 extends Component {

  render () {
    const step = this.props.stepForm
    const image = "http:\/\/res.cloudinary.com/da4nnrzbu/image/upload/v1583140180/ff0cntbasziwmlmmfuet.jpg"

    const handleClick = () => {
      this.props.switchStepFrom(step)
    }

    return(
      <div className={`form-container${step == 2 ? " form-hidden" : ""}`}>
        <MessageMagda
          text1={`Bonjour ! Je suis Magdalena.
            5 minutes seront nécessaires pour remplir ce formulaire.
            L'objectif : permettre à notre équipe de mieux te connaître et de t'accompagner pour ta prochaine aventure.
            N'oublie pas ! Certaines de tes réponses seront masquées pour la start-up afin de garder ton anonymat.`}
          text2="On commence ? Dans quelle ville recherches-tu ?" />

        <InputForm title="Ville" placeholder="Paris, 15e arrondissement" name="city"/>
        <MessageMagda text1="La majorité de nos opportunités se trouvent à Paris. Mais nous recevons aussi des offres de la france entière."/>
        <button className="btn-violet-square margin-left-55" onClick={handleClick}>Étape suivante</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    stepForm: state.stepForm,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ switchStepFrom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm1);
