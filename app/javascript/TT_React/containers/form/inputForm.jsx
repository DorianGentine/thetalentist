import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class InputForm extends Component {
  render () {

    return(
      <div className="input-form margin-left-55 margin-bottom-30">
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

export default connect(null, null)(InputForm);
