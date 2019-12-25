import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { closeModalTalent } from '../actions';

class ModalTalent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      icon: ["far", "bookmark"],
    };
  }

  componentDidMount(){
    if(this.state.checked){
      this.setState({ icon: ["fas", "bookmark"] })
    }
  }

  render () {
    if(this.props.modalOpened){
      const talent = this.props.modalSelected
      let color = {
        backgroundColor: "lightgray",
        color: "gray",
      }

      if(talent.job.toLowerCase() === "product"){
        color = {
          backgroundColor: "#FCEBEB",
          color: "#FE7373",
        }
      }else if(talent.job.toLowerCase() === "finances"){
        color = {
          backgroundColor: "#DFDEFE",
          color: "#5F5DDA",
        }
      }else if(talent.job.toLowerCase() === "market"){
        color = {
          backgroundColor: "#FFF7E2",
          color: "#FFAC4B",
        }
      }else if(talent.job.toLowerCase() === "operations"){
        color = {
          backgroundColor: "#EDF4FE",
          color: "#6A9FE2",
        }
      }

      window.onkeydown = (event) => {
        if (event.key === "Escape") {
          this.props.closeModalTalent()
        }
      };

      const toggleIcon = () => {
        if(this.state.checked){
          this.setState({
            checked: false,
            icon: ["far", "bookmark"]
          })
        }else{
          this.setState({
            checked: true,
            icon: ["fas", "bookmark"]
          })
        }
      }

      const renderSectors = () => talent.sectors.map((sector, index) => {
        if(index === talent.sectors.length - 1 ){
          return <span key={index}>{sector.title}</span>
        }else{
          return <span key={index}>{sector.title}, </span>
        }
      })

      return(
        <div className='modal active'>
          <div className="modal-content-react">
            <div className="flex align-items-center">
              <p className="card-job margin-right-30" style={color}>{talent.job}</p>
              <div className="flex-grow-1">
                <p className="card-position">{talent.position}</p>
                <p className="card-formation">{talent.city}</p>
              </div>
              <FontAwesomeIcon className="card-bookmark margin-right-5" icon={this.state.icon} onClick={toggleIcon} />
              <p className="margin-right-15 no-margin pointer" onClick={toggleIcon}>Épingler ce talent</p>
              <FontAwesomeIcon className="margin-right-5" icon={["fas", "share-alt"]} />
              <p className="margin-right-15 no-margin">Partager</p>
              <div className="add-user">
                <FontAwesomeIcon className="add-user-icon" icon={["fas", "user-plus"]} />
              </div>
            </div>

            <hr className="ligne-horizontal"/>

            <div className="flex align-items-center space-between">
              <p className="no-margin">Expérience : <strong>{talent.year_experience_job} {talent.year_experience_job === 1 ? "an" : "ans"}</strong></p>
              <p className="no-margin">Secteur : <strong>{renderSectors()}</strong></p>
              <p className="no-margin">Rémunération : <strong>{talent.next_aventure.remuneration}</strong></p>
              <p className="no-margin">Disponibilité : <strong>{talent.year_experience_job} {talent.year_experience_job === 1 ? "an" : "ans"}</strong></p>
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
    modalOpened: state.modalOpened,
    modalSelected: state.modalSelected
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModalTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTalent);
