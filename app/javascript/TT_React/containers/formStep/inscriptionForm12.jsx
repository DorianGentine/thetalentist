import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

import { fetchPost } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import InputForm from '../form/inputForm'

class InscriptionForm12 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      newPhoto: null
    }
  }

  handleImageChange = e => {
    if (e.target.files[0]) {
      this.setState({ newPhoto: e.target.files[0] });
      // const formData = new FormData();
      // console.log('e.target.files', e.target.files[0])
      // formData.append("file", e.target.files[0]);
      // console.log('formData', formData)
    }
  };

  uploadPhoto = () => {
    const formData = new FormData();
    console.log('this.state.newPhoto', this.state.newPhoto)
    formData.append("file", this.state.newPhoto);
    console.log('formData', formData)
    this.props.formValue.photo = formData
    console.log('this.props.formValue', this.props.formValue)
    // this.props.fetchPost(`/api/v1/talents/${21}`, formData, "PATCH")
  }
  
  render () {
    const isMobile = this.props.isMobile
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
      // console.log(!typeof values.photo == "string")
      let input = document.getElementById("avatar");
      let fReader = new FileReader();
      fReader.onload = function(event){
        that.setState({ image : event.target.result })
      }
      fReader.readAsDataURL(input.files[0]);
    }

    return(
      <div className={setFormContainerClass(actualStep, 12)}>
        <h2 className={`${isMobile ? "" : "margin-left-55 "}violet`}>Bravo {firstname} 👏</h2>
        <h3 className={`${isMobile ? "" : "margin-left-55 "}violet`}>Le formulaire est terminé !</h3>
        <p className={`${isMobile ? "" : "margin-left-55 "}margin-bottom-30 label-color`}>Merci d'avoir pris ces quelques minutes ! Ton profil a été envoyé à notre équipe, 
          qui te recontactera dans les 2 prochains jours, afin de t'accompagner dans ta prochaine aventure !
          Avant d’accéder à ton profil, je te laisse nous communiquer le lien de ton profil Linkedin :
        </p>
        {/* <label className={`${isMobile ? "" : "margin-left-55 "}margin-bottom-30`} htmlFor="avatar" >
          <span className="font-14 bold">Avatar</span>
          <div className="flex align-items-center margin-top-15">  
            {image != null ? 
              <img className="photo-conv photo-conv-lg" src={image} alt={values.photo.slice(12)}></img> 
              : 
              <div className="photo-conv photo-conv-lg">{firstname.slice(0, 1)}</div>
            }
            <p className="no-margin margin-left-15 add-picture">{values.photo ? values.photo.slice(12) : "+ Ajouter une photo" }</p>
          </div>
          <input className="hidden" type="file" name="photo" id="avatar" accept="image/png, image/jpeg" onChange={this.handleImageChange} />
          <button onClick={this.uploadPhoto}>TEST</button>
          <Field className="hidden" name="photo" id="avatar" component="input" type="file" />
        </label> */}
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
    isMobile: state.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm12);
