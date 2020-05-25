import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class RadioForm extends Component {
  render () {
    let rangeValue = this.props.formValue[this.props.name]
    if(this.props.name == "talent_job_attributes[years]"){
      rangeValue = this.props.formValue.talent_job_attributes.years
    }
    return(
      <div className="flex align-items-center margin-left-55 margin-bottom-30" style={{minHeight: "25px"}}>
        <div className="slider-container relative margin-right-30">
          <Field
            component="input"
            type="range"
            className="slider"
            max={this.props.max}
            name={this.props.name}
          />
          <div className="left-slider" style={{width: `${rangeValue / 30 * 100}%`}}></div>
        </div>
        {rangeValue != undefined && rangeValue != 0 ? <p className="no-margin">{`${rangeValue} ${rangeValue == 1 ? "an" : "ans"}`}</p> : null }
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
