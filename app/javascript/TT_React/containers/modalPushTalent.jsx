import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchPost, fetchGET } from '../actions';
import setJobColor from '../../components/setJobColor';

class ModalPushTalent extends PureComponent {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     checked: this.props.talent.pin != false,
  //     icon: ["far", "bookmark"],
  //   };
  // }

  render () {
    const talent = this.props.talent
    let headhunters = this.props.headhunters

    if(talent){
      console.log('talent', talent)
      let valueToSend = {
        talent_id: talent.id,
        recruteur_id: null
      }
      if(!this.props.headhunters){
        console.log('this.props.talent', this.props.talent)
        this.props.fetchGET('/api/v1/headhunters', "FETCH_HEADHUNTERS")
      }
      if(headhunters){
        headhunters = headhunters.headhunters
      }
      console.log('headhunters', headhunters)
      let image = talent.photo.small_bright_face.url
      let fullName = `${talent.first_name} ${talent.last_name}`
      let color = {
        backgroundColor: "lightgray",
        color: "gray",
      }

      if(this.props.jobs != null){
        color = setJobColor(talent.job, this.props.jobs)
      }

      const closeModal = () => {
        this.props.pushTalent(null)
      }

      const handleChange = value => {
        valueToSend.recruteur_id = value.id
        console.log('valueToSend', valueToSend)
      }

      const sendReco = () => {
        this.props.fetchPost(`/api/v1/talents/${talent.id}/recommandation`, valueToSend, "POST")
        closeModal()
      }

      return(
        <div className='modal active'>
            <div className="close-modal" onClick={closeModal}></div>
            <div className="modal-content-react" style={{maxWidth: "40vw"}}>
              <h3 className="violet">Recommander ce talent</h3>
              <hr className="ligne-horizontal" />
              <div className="blue-background flex space-between margin-bottom-20">
                {image != null ?
                  <img className="photo-conv photo-conv-lg" src={image} alt="avatar"></img>
                  :
                  <div className="photo-conv photo-conv-lg">{fullName.slice(0, 1)}</div>
                }
                <div className="flex-grow-1">
                  <p className="bold violet font-16">{talent.position}</p>
                  <p className="subtitle italic">{talent.city}</p>
                  <p className="badge violet-background no-margin">{fullName}</p>
                </div>
                <p className="card-job align-self-start" style={color}>{talent.job}</p>
              </div>
              <p className="bold violet">Sélectionner un recruteur</p>
              <Select
                options={headhunters}
                name="headhunter"
                isSearchable={true}
                getOptionLabel={option => `${option.firstname} de ${option.startup}`} 
                getOptionValue={option => option.id}
                onChange={value => {
                  handleChange(value)
                }}
                placeholder="Recruteur"
              />
              <div className="flex flex-end align-items-baseline margin-top-30">
                <p className="no-margin violet margin-right-15 pointer" onClick={closeModal}>Annuler</p>
                <button className="btn-violet-square" onClick={sendReco}>Envoyer ce profil</button>
              </div>
            </div>
        </div>
      );
    }else{
      return null
    }
  }
};

function mapStateToProps(state) {
  return {
    headhunters: state.headhunters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPushTalent);
