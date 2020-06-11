import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class InputForm extends Component {
  render () {
    let valueLength = 0, value
    if(this.props.name == "next_aventure_attributes[see_my_job]"){
      value = this.props.formValue.next_aventure_attributes.see_my_job
    }else if(this.props.name == "next_aventure_attributes[good_manager]"){
      value = this.props.formValue.next_aventure_attributes.good_manager
    }else if(this.props.name == "next_aventure_attributes[looking_for]"){
      value = this.props.formValue.next_aventure_attributes.looking_for
    }
    if(value != undefined){
      valueLength = value.length
    }

    return(
      <div className="input-form margin-left-55 margin-bottom-30">
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <Field
          component="textarea"
          className="textarea-form"
          rows="3"
          maxLength={this.props.maxlength}
          name={this.props.name}
          placeholder={this.props.placeholder}
        />
        <p className="subtitle italic float-right">{`${this.props.maxlength - valueLength} caractères restants`}</p>
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

export default connect(null, null)(InputForm);
