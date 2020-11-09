import React, { Component } from 'react';
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
    }
  }
  

  render () {
    const isMobile = this.props.isMobile
    const limit = this.props.limit

    const Menu = props => {
      const inputLength = props.selectProps.inputValue.length
      const optionSelectedLength = props.getValue().length || 0;
      let text = props.children
      if(limit != 1 && optionSelectedLength >= limit){
        text = <div className="select-form__max-reached-alert">😫 Vous avez atteint le maximum de choix 😫</div>
      }else if(inputLength >= 30){
        text = <div className="select-form__max-reached-alert">😫 Malheureusement nous n'acceptons pas les entrées de plus de 30 caractères 😫</div>
      }
      return (
        <components.Menu {...props}>
          {text}
        </components.Menu>
      );
    };

    const handleChange = (newValue) => {
      let length = 0
      if(newValue){
        length = newValue.length
      }
      this.setState({valueLength: length})
    };

    const ReactSelectAdapter = ({ input, ...rest }) => {
      const isValidNewOption = (inputValue, selectValue, selectOptions) => {
        if (
          selectValue.length < limit && 
          inputValue.trim().length > 30 ||
          inputValue.trim().length === 0 ||
          selectOptions.find(option => option.title.toLowerCase() === inputValue.toLowerCase())
        ){
          return false;
        }
        return true;
      }
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
        />
      )
    }
          
    return(
      <div className={`margin-bottom-30${isMobile ? "" : " margin-left-55"}`}>
        <Field
          name={this.props.name}
          component={ReactSelectAdapter}
          options={this.props.options}
        />
        <p className="subtitle italic float-right">{`${limit - this.state.valueLength} compétences restantes`}</p>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
  };
}

export default connect(mapStateToProps, null)(InputForm);
