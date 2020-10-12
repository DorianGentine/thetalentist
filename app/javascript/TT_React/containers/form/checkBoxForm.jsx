import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class RadioForm extends Component {
  render () {
    const choices = this.props.choices
    const isMobile = this.props.isMobile

    const renderFields = () => choices.map((choice, index) => {
      if(choice != undefined){
        const value = choice.id || choice
        const title = choice.title || choice
        let name = this.props.name
        let formName = this.props.formValue[this.props.name]
        if(name == "talent_job_attributes[job_id]"){
          formName = this.props.formValue.talent_job_attributes.job_id
        }else if(name == "next_aventure_attributes[sector_ids]"){
          formName = this.props.formValue.next_aventure_attributes.sector_ids
        }else if(name == "next_aventure_attributes[waiting_for_one]"){
          formName = this.props.formValue.next_aventure_attributes.waiting_for_one
        }else if(name == "next_aventure_attributes[mobilities_attributes]"){
          formName = this.props.formValue.next_aventure_attributes.mobilities_attributes
        }

        const limit = this.props.limit
        let choiceCount, disabled = false
        if(formName != undefined){
          //défini l'ordre dans lequel btns ont été appuyé
          for (let i = 0; i < formName.length; i++) {
            if(formName[i] == value){
              choiceCount = i + 1
            }
          }
          // Désactive au-delà de la limite
          if(limit != undefined && formName.length == limit && !formName.includes(value)){
            disabled = true
          } 
        }


        return(
          <label className="checkbox-form" key={index}>
            <Field
              component="input"
              name={name}
              type="checkbox"
              value={value}
              disabled={disabled}
            />
            <div className="check-form">
              {title}
              <span className="choice-count">{choiceCount}</span>
            </div>
          </label>
        )
      }
    })


    return(
      <div className={`flex flex-wrap margin-bottom-30${this.props.noMargin55 || isMobile ? "" : " margin-left-55"}`}>
        {choices != null ? renderFields() : "chargement..."}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(mapStateToProps, null)(RadioForm);
