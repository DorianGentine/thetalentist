import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import Creatable from 'react-select/creatable';
import { components } from 'react-select';

// import { fetchGET, fetchPost } from '../../actions';

import SelectCritere from './selectCritere'

class EditCritere extends Component {

  render () {
    let critere = this.props.critere

    if(critere.name == "talent_job_attributes[year]"){
      let rangeValue = this.props.formValue.talent_job_attributes.year
      return(
        <div>
          <p className="criteres">{critere.title}</p>
          <div className="flex align-items-center space-between" style={{minHeight: "25px"}}>
            <div className="slider-container relative" style={{width: "75%"}}>
              <Field
                component="input"
                type="range"
                className="slider"
                max={critere.max}
                name={critere.name}
                />
              <div className="left-slider" style={{width: `${rangeValue / critere.max * 100}%`}}></div>
            </div>
            {rangeValue != undefined && rangeValue != 0 ? <p className="no-margin">{`${rangeValue == 20 ? `${rangeValue}+` : rangeValue} ${rangeValue == 1 ? "an" : "ans"}`}</p> : null }
          </div>
        </div>
      );
    }else if(critere.name == "next_aventure_attributes[sectors]" || 
    critere.name == "next_aventure_attributes[remuneration]" ||
    critere.name == "next_aventure_attributes[availability]" ||
    critere.name == "talent_job_attributes.job_id" ||
    critere.name == "next_aventure_attributes[mobilities_attributes][0][title]"){
      return <SelectCritere critere={critere} formValue={this.props.formValue} />
    }else{
      return(
        <Field name={critere.name}>
          {({ input, meta }) => (
            <div>
              <p className="criteres">{critere.title}</p>
              <input {...input} type={critere.type || "text"} className="criteres-input" />
              {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
            </div>
          )}
        </Field>
      );
    }
  }
};

// function mapStateToProps(state) {
//   return {
//     talent: state.talent,
//     jobs: state.jobs,
//     user: state.user
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET, fetchPost }, dispatch);
// }

export default connect(null, null)(EditCritere);
