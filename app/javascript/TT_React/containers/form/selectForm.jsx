import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import Creatable from 'react-select/creatable';
import { components } from 'react-select';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueLength: 0
    }  
  }

  componentDidMount() {
    if(this.props.formValue[this.props.name] != undefined){
      this.setState({valueLength: this.props.formValue[this.props.name].length})
      // valueLength = this.props.formValue[this.props.name].length
    }
  }
  

  render () {
    // let valueLength = 0
    // if(this.props.formValue[this.props.name] != undefined){
    //   valueLength = this.props.formValue[this.props.name].length
    // }

    const Menu = props => {
      const optionSelectedLength = props.getValue().length || 0;
      return (
        <components.Menu {...props}>
          {optionSelectedLength < this.props.limit ? (
            props.children
          ) : (
            <div className="select-form__max-reached-alert">😫 Vous avez atteint le maximum de choix 😫</div>
          )}
        </components.Menu>
      );
    };

    const handleChange = (newValue) => {
      this.setState({valueLength: newValue.length})
    };

    const ReactSelectAdapter = ({ input, ...rest }) => {
      const isValidNewOption = (inputValue, selectValue) =>
        inputValue.length > 0 && selectValue.length < this.props.limit;
      return (
        <Creatable 
          {...input} 
          {...rest}
          closeMenuOnSelect={false}
          components={{ Menu }}
          isMulti
          placeholder={this.props.placeholder}
          onChange={(value) => {
            input.onChange(value)
            handleChange(value)
          }}
          className="form-multi-select"
          classNamePrefix="select-form"
          isValidNewOption={isValidNewOption}
          // defaultMenuIsOpen={true}
        />
      )
    }
          
    return(
      <div className="margin-left-55 margin-bottom-30">
        <Field
          name={this.props.name}
          component={ReactSelectAdapter}
          options={this.props.options}
        />
        <p className="subtitle italic float-right">{`${this.props.limit - this.state.valueLength} compétences restantes`}</p>
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
