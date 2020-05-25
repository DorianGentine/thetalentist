import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class RadioForm extends Component {
  render () {
    const choices = this.props.choices

    const renderFields = () => choices.map((choice, index) => {
      if(choice != undefined){
        const value = choice.id || choice
        const title = choice.title || choice
        let name = this.props.name
        if(name == "talent_job_attributes"){
          name = "talent_job_attributes[job_id]"
        }

        const limit = this.props.limit
        let formName = this.props.formValue[this.props.name]
        let choiceCount, disabled = false
        if(formName != undefined){
          // Condition pour talent_job
          if(name == "talent_job_attributes[job_id]" && formName.job_id != undefined){
            formName = formName.job_id
          }
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
      <div className="flex flex-wrap margin-left-55 margin-bottom-30">
        {choices != null ? renderFields() : "chargement..."}
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     stepForm: state.stepForm,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(null, null)(RadioForm);
