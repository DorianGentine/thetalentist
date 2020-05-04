import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { switchStepFrom } from '../actions';

import InputForm from './inputForm'
import MessageMagda from './messageMagda'


class InscriptionForm2 extends Component {

  render () {
    const actualStep = this.props.stepForm
    const formStep = 2
    const image = "http:\/\/res.cloudinary.com/da4nnrzbu/image/upload/v1583140180/ff0cntbasziwmlmmfuet.jpg"

    const handleClick = () => {
      this.props.switchStepFrom(actualStep)
    }

    let formContainerClass = "form-container form-appearance hidden"
    if(actualStep == formStep + 1){
      formContainerClass = "form-container form-hidden"
    }else if(actualStep == formStep){
      formContainerClass = "form-container"
    }else if(actualStep == formStep - 1){
      formContainerClass = "form-container form-appearance"
      setTimeout(()=>{
        const formHidden = document.getElementsByClassName("form-container")[1]
        formHidden.classList.add('hidden')
      }, 1000)
    }

    return(
      <div className={formContainerClass}>
        <MessageMagda text1={`Ok c'est noté ! En habitant sur ${"Paris"} tu restes ouvert à la mobilité ?`}/>
        <InputForm title="Ville" placeholder="Paris, 15e arrondissement" name="city"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm2);
