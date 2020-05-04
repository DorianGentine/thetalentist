import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { switchStepFrom } from '../actions';

class InputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    };
  }

  render () {
    const step = this.props.stepForm

    const handleOnChange = value => {
      this.setState({ value: value })
    }

    return(
      <div className="input-form margin-left-55 margin-bottom-30">
        <label className="requis" htmlFor={this.props.name}>{this.props.title}</label>
        <input
          type="text"
          name={this.props.name}
          placeholder={this.props.placeholder}
          label={this.props.label}
          value={this.state.value}
          onChange={(input) => {handleOnChange(input.target.value)}}
        />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    stepForm: state.stepForm,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ switchStepFrom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
