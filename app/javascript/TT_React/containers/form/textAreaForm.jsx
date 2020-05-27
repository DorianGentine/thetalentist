import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class InputForm extends Component {
  render () {
    let valueLength = 0
    if(this.props.formValue[this.props.name] != undefined){
      valueLength = this.props.formValue[this.props.name].length
    }

    return(
      <div className="input-form margin-left-55 margin-bottom-30">
        <label className="requis" htmlFor={this.props.name}>{this.props.title}</label>
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
