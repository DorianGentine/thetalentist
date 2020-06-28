import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Creatable from 'react-select/creatable';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, fetchPost } from '../../actions';

class RenderSkills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    };
  }

  componentDidMount(){
    if (this.props.skills === null) {
      this.props.fetchGET('/api/v1/skills', "FETCH_SKILLS")
    }
  }

  render () {
    let talent = this.props.talent
    let user = this.props.user
    let userModel
    if(user){
      userModel = user.is_a_model
    }
    let competences = [], initialValues = {}
    const limit = 10
    if(talent){
      competences = talent.skills
      initialValues = {
        skills: competences
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
      // MEP skill_ids
      if(valuesToSend.skills){
        valuesToSend.skill_ids = []
        for (let i = 0; i < valuesToSend.skills.length; i++) {
          const element = valuesToSend.skills[i];
          valuesToSend.skill_ids[i] = element.id
        }
        delete valuesToSend['skills']
      }

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

    const renderCompetences = () => competences.map((competence, index) => {
      return <p key={index} className="competence">{competence.title}</p>
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

    const handleChange = (newValue) => {
      this.setState({valueLength: newValue.length})
    };

    const ReactSelectAdapter = ({ input, ...rest }) => {
      const isValidNewOption = (inputValue, selectValue) => 
        inputValue.length > 0 && selectValue.length < limit;
      return (
        <Creatable 
          {...input} 
          {...rest}
          closeMenuOnSelect={false}
          components={{ Menu }}
          isMulti={limit != 1}
          onChange={(value) => {
            let newValue = value
            if(limit == 1){
              newValue = [value]
            }
            input.onChange(newValue)
            handleChange(value)
          }}
          getOptionLabel={option => option.title || option} 
          getOptionValue={option => option.id || option}
          className="form-multi-select"
          classNamePrefix="select-form"
          isValidNewOption={isValidNewOption}
          // defaultMenuIsOpen={true}
        />
      )
    }

    const renderFormCompetences = () => {
      return(
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="skills"
                component={ReactSelectAdapter}
                options={this.props.skills.skills}
              />
              <p className="subtitle italic float-right">{`${limit - values.skills.length} compétences restantes`}</p>
              <button 
                className="btn-gray-violet "
                >Enregistrer
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
          <h4 className="box-title">Mes compétences clés</h4>
          {userModel == "Talent" ? <p className="pointer" onClick={() => handleClick("questions")}>Éditer</p> : null }
        </div>
        <h5 className="box-subtitle">{`${competences.length} compétences listées`}</h5>
        {this.state.edit ? 
          renderFormCompetences()
        :
          <div className="flex flex-wrap">
            {competences.length > 0 ? renderCompetences() : null}
          </div>
        }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    skills: state.skills,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderSkills);
