import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Creatable from 'react-select/creatable';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, fetchPost, updateTalent } from '../../actions';

class RenderKnowns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    };
  }

  componentDidMount(){
    if (this.props.knowns === null) {
      this.props.fetchGET('/api/v1/knowns', "FETCH_KNOWNS")
    }
  }

  render () {
    let talent = this.props.talent
    let user = this.props.user
    let userModel
    if(user){
      userModel = user.is_a_model
    }
    let knowns = [], initialValues = {}
    const limit = 10
    if(talent){
      knowns = talent.knowns
      initialValues = {
        knowns: knowns
      }
    }

    const validate = values => {
      console.log('values', values)
      const errors = {}
      return errors
    }

    const valuesFilter = values => {
      const valuesToSend = {}
      const preValues = initialValues 
      Object.keys(values).forEach(value => {
        if(preValues[value] !== values[value]){
          valuesToSend[value] = JSON.parse(JSON.stringify(values[value]))
        }
      })
      // MEP known_ids
      if(valuesToSend.knowns){
        valuesToSend.known_ids = []
        for (let i = 0; i < valuesToSend.knowns.length; i++) {
          const element = valuesToSend.knowns[i];
          valuesToSend.known_ids[i] = element.id
        }
        delete valuesToSend['knowns']
      }

      this.props.updateTalent(this.props.talent, valuesToSend, values)
      initialValues = values
      return valuesToSend
    }

    const onSubmit = values => {
      const valuesToSend = valuesFilter(values)
      console.log('valuesToSend', valuesToSend)
      if(Object.keys(valuesToSend).length > 0){
        this.props.fetchPost(`/api/v1/talents/${talent.talent.id}`, valuesToSend, "PATCH")
      }
      this.setState({edit: false})
    }

    const renderKnowns = () => knowns.map((known, index) => {
      return <p key={index} className="competence">{known.title}</p>
    })

    const Menu = props => {
      const optionSelectedLength = props.getValue().length || 0;
      return (
        <components.Menu {...props}>
          {limit == 1 || optionSelectedLength < limit ? (
            props.children
          ) : (
            <div className="select-form__max-reached-alert">😫 Vous avez atteint le maximum de choix 😫</div>
          )}
        </components.Menu>
      );
    };

    const ReactSelectAdapter = ({ input, ...rest }) => {
      const isValidNewOption = (inputValue, selectValue, selectOptions) => {
        if (
          selectValue.length < limit && 
          inputValue.trim().length === 0 ||
          selectOptions.find(option => option.name === inputValue
          )
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
          isMulti={limit != 1}
          onChange={(value, {action}) => {
            switch(action) {
              case 'select-option':
                input.onChange(value)
                break;
              case 'create-option':
                input.onChange(value)
                const options = this.props.knowns.knowns;
                options.push(value[(value.length - 1)]);
                break;
              case 'remove-value':
                input.onChange(value)
                break;
            }
          }}
          getOptionLabel={option => option.title || option} 
          getOptionValue={option => option.id || option}
          getNewOptionData={(inputValue, optionLabel) => ({
            id: inputValue,
            title: optionLabel,
          })}
          className="form-multi-select"
          classNamePrefix="select-form"
          isValidNewOption={isValidNewOption}
          // defaultMenuIsOpen={true}
        />
      )
    }

    const renderFormKnowns = () => {
      return(
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="knowns"
                component={ReactSelectAdapter}
                options={this.props.knowns.knowns}
              />
              <p className="subtitle italic float-right">{`${limit - (values.knowns ? values.knowns.length : 0)} savoir-être restants`}</p>
              <button
                disabled={!values.knowns || values.knowns.length == 0} 
                className={`btn-gray-violet${values.knowns && values.knowns.length > 0 ? "" : " red-background white not-allowed"}`}
                >{values.knowns && values.knowns.length > 0 ? "Enregistrer" : "Renseigne au moins une compétence"}
              </button>
            </form>
          )}
        />
      )
    }

    const handleClick = edit => {
      this.setState({edit: !this.state.edit})
    }

    return(
      <div className="gray-border-box">
        <div className="flex space-between">
          <h4 className="box-title">Mes savoir-êtres</h4>
          {userModel == "Talent" ? <p className="pointer" onClick={() => handleClick("questions")}>Éditer</p> : null }
        </div>
        <h5 className="box-subtitle">{`${knowns.length} savoir-êtres listés`}</h5>
        {this.state.edit ? 
          renderFormKnowns()
        :
          <div className="flex flex-wrap">
            {knowns.length > 0 ? renderKnowns() : null}
          </div>
        }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    knowns: state.knowns,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, updateTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderKnowns);