import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class InputForm extends Component {
  render () {

    let classList = "input-form w-input-form margin-left-55 margin-bottom-30"
    if(this.props.classList){
      classList = `input-form ${this.props.classList}`
    }

    return(
      <div className={classList}>
        <label className="requis" htmlFor={this.props.name}>{this.props.title}</label>
        <Field
          component="input"
          name={this.props.name}
          placeholder={this.props.placeholder}
        />
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

// export default connect(null, null)(InputForm);
export default InputForm;
