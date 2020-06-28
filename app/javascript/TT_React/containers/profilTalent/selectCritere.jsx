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
    if(this.props.critere.name == "next_aventure_attributes[sectors]"){
      this.setState({valueLength: this.props.formValue.next_aventure_attributes.sectors.length})
    }
  }
  

  render () {
    const critere = this.props.critere

    const Menu = props => {
      const optionSelectedLength = props.getValue().length || 0;
      return (
        <components.Menu {...props}>
          {critere.limit == 1 || optionSelectedLength < critere.limit ? (
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
        inputValue.length > 0 && selectValue.length < critere.limit;
      return (
        <Creatable 
          {...input} 
          {...rest}
          closeMenuOnSelect={false}
          components={{ Menu }}
          isMulti={critere.limit != 1}
          onChange={(value) => {
            let newValue = value
            if(critere.limit == 1){
              newValue = [value]
            }
            input.onChange(newValue)
            handleChange(value)
          }}
          getOptionLabel={option => option.title || option} 
          getOptionValue={option => option.id || option}
          className="profil-multi-select"
          classNamePrefix="select-form"
          isValidNewOption={isValidNewOption}
          // defaultMenuIsOpen={true}
        />
      )
    }
          
    return(
      <div>
        <p className="criteres">{critere.title}</p>
        <Field
          name={critere.name}
          component={ReactSelectAdapter}
          options={critere.options}
        />
        {critere.limit != 1 ? <p className="subtitle italic float-right">{`${critere.limit - this.state.valueLength} compétences restantes`}</p> : null }
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
