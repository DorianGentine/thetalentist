import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class InputForm extends Component {
  render () {

    const renderOptions = () => this.props.options.map((option, index) => {
      if(option != undefined){
        return(
          <option value={option} key={index}>{option}</option>
        )
      }
    })


    return(
      <div className="margin-left-55 margin-bottom-30">
        <Field name="toppings" type="select" component="select" multiple>
          {renderOptions()}
        </Field>
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
