import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class RadioForm extends Component {
  render () {
    const isMobile = this.props.isMobile
    let rangeValue = this.props.formValue[this.props.name]
    if(this.props.name == "talent_job_attributes[year]"){
      rangeValue = this.props.formValue.talent_job_attributes.year
    }
    return(
      <div className={`flex align-items-center margin-bottom-30${isMobile ? "" : " margin-left-55"}`} style={{minHeight: "25px"}}>
        <div className="slider-container relative margin-right-30">
          <Field
            component="input"
            type="range"
            className="slider"
            max={this.props.max}
            name={this.props.name}
          />
          <div className="left-slider" style={{width: `${rangeValue / this.props.max * 100}%`}}></div>
        </div>
        {rangeValue != undefined && rangeValue != 0 ? <p className="no-margin">{`${rangeValue == 20 ? `${rangeValue}+` : rangeValue} ${rangeValue == 1 ? "an" : "ans"}`}</p> : null }
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
