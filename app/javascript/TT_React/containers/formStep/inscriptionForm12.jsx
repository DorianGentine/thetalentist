import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

// import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import InputForm from '../form/inputForm'

class InscriptionForm12 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
  }
  
  render () {
    const actualStep = this.props.stepForm
    const values = this.props.formValue
    const talent = this.props.talent
    let firstname = "  "
    if(talent != null){
      firstname = talent.talent.firstname
    }
    let image = this.state.image
    const that = this
    if(values.photo){
      console.log(!typeof values.photo == "string")
      if(!typeof values.photo == "string"){
        let input = document.getElementById("avatar");
        let fReader = new FileReader();
        fReader.onload = function(event){
          that.setState({ image : event.target.result })
        }
        fReader.readAsDataURL(input.files[0]);
      }
    }

    return(
      <div className={setFormContainerClass(actualStep, 12)}>
        <h2 className="margin-left-55 violet">Bravo {firstname} 👏</h2>
        <h3 className="margin-left-55 violet">Le formulaire est terminé !</h3>
        <p className="margin-left-55 margin-bottom-30 label-color">Merci d'avoir pris ces quelques minutes ! Ton profil a été envoyé à notre équipe, 
          qui te recontactera dans les 2 prochains jours, afin de t'accompagner dans ta prochaine aventure !
          En attendant, tu peux compléter c'est quelques infos manquantes avant d'accéder à ton profil !
        </p>
        <label className="margin-left-55 margin-bottom-30" htmlFor="avatar" >
          <span className="font-14 bold">Avatar</span>
          <div className="flex align-items-center margin-top-15">  
            {image != null ? 
              <img className="photo-conv photo-conv-lg" src={image} alt={values.photo.slice(12)}></img> 
              : 
              <div className="photo-conv photo-conv-lg">{firstname.slice(0, 1)}</div>
            }
            <p className="no-margin margin-left-15 add-picture">{values.photo ? values.photo.slice(12) : "+ Ajouter une photo" }</p>
          </div>
          <Field className="hidden" name="photo" id="avatar" component="input" type="file" />
        </label>
        <InputForm name="linkedin" title="Ton Linkedin" placeholder="https://www.linkedin.com/in..." />
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
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(mapStateToProps, null)(InscriptionForm12);
