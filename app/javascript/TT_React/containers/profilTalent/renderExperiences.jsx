import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import Creatable from 'react-select/creatable';
 
import "react-datepicker/dist/react-datepicker.css";

import { fetchGET, fetchPost } from '../../actions';
// import setJobColor from '../../../components/setJobColor';

import RenderDatePicker from './renderDatePicker'
import SelectCritere from './selectCritere'

class ExperiencesProfessionnelles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      add: false,
    };
  }

  componentDidMount() {
    if(!this.props.startups){
      this.props.fetchGET('/api/v1/startups', "FETCH_STARTUPS")
    }
    if(!this.props.companyTypes) {
      this.props.fetchGET('/api/v1/company_types', "FETCH_COMPANY_TYPES")
    }
  }
  

  render () {
    let talent = this.props.talent
    let user = this.props.user
    let companyTypes = this.props.companyTypes
    let startups = this.props.startups
    let userModel, initialValues = {}
    if(companyTypes){
      companyTypes = companyTypes.company_types
    }
    if(startups){
      startups = startups.startups
    }
    if(user){
      userModel = user.is_a_model
    }
    let experiences = []
    let experience = {}
    if(talent && companyTypes && startups){
      experiences = talent.experiences
      for (let i = 0; i < experiences.length; i++) {
        const experience = experiences[i];
        if(typeof experience.company_name === "string"){
          experience.company_name = startups.find(startup => startup.name === experience.company_name)
        }
        if(typeof experience.company_type_id === "number"){
          experience.company_type_id = companyTypes.find(companyType => companyType.id === experience.company_type_id)
        }
        experience.starting = new Date(experience.starting)
        experience.years = new Date(experience.years)
      }
      initialValues = {
        experiences_attributes: experiences
      }
      experience = {
        company_name: "",
        company_type_id: null,
        currently: false,
        overview: null,
        position: "",
        talent_id: talent.talent.id,
        years: null
      }
    }

    const addExperience = () => {
      experiences.push(experience)
      initialValues = {
        experiences_attributes: experiences
      }
      this.setState({add: !this.state.add})
    }
    const deleteExperience = index => {
      console.log('index', index)
      console.log('experiences', typeof experiences)
      experiences.splice(index, 1)
      initialValues = {
        experiences_attributes: experiences
      }
      this.setState({add: !this.state.add})
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

      if(valuesToSend.experiences_attributes){
        for (let i = 0; i < valuesToSend.experiences_attributes.length; i++) {
          const experiences_attributes = valuesToSend.experiences_attributes[i];
          if (experiences_attributes.company_type_id) {
            experiences_attributes.company_type_id = experiences_attributes.company_type_id.id
          }
          if (!experiences_attributes.years) {
            experiences_attributes.currently = true
          }else{
            experiences_attributes.currently = false
          }
          if (experiences_attributes.company_name){
            experiences_attributes.company_name = experiences_attributes.company_name.name
          }
          delete experiences_attributes.created_at
          delete experiences_attributes.updated_at
          delete experiences_attributes.link
          delete experiences_attributes.talent_id
        }
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

    const ReactSelectAdapter = ({ input, ...rest }) => {
      return (
        <Creatable 
          {...input} 
          {...rest}
          closeMenuOnSelect={true}
          onChange={(value) => {
            input.onChange(value)
          }}
          getOptionLabel={option => option.title || option.name || option} 
          getOptionValue={option => option.id || option}
          className="profil-multi-select"
          classNamePrefix="select-form"
        />
      )
    }

    const renderEditExperiences = () => experiences.map((experience, index) => {
      return(
        <div className="edit-gray-box-question row" key={index}>
          <div className="col-md-6">
            <p className="bold no-margin margin-top-15">Poste</p>
            <Field name={`experiences_attributes[${index}].position`}>
              {({ input, meta }) => (
                <div>
                  <input {...input} type="text" className="edit-gray-box-input" />
                  {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
                </div>
              )}
            </Field>
          </div>
          <div className="col-md-6">
            <p className="bold no-margin margin-top-15">Entreprise</p>
            <Field
              name={`experiences_attributes[${index}].company_name`}
              component={ReactSelectAdapter}
              options={startups}
            />
          </div>
          <div className="col-md-3">
            <p className="bold no-margin margin-top-15">Début d'activité</p>
            <RenderDatePicker name={`experiences_attributes[${index}].starting`} showMonthYearPicker={true} />
          </div>
          <div className="col-md-3">
            <p className="bold no-margin margin-top-15">Date de fin</p>
            <RenderDatePicker name={`experiences_attributes[${index}].years`} showMonthYearPicker={true} />
            <p className="subtitle italic no-margin">Vide si toujours en poste</p>
          </div>
          <div className="col-md-6">
            <p className="bold no-margin margin-top-15">Type d'entreprise</p>
            <Field
              name={`experiences_attributes[${index}].company_type_id`}
              component={ReactSelectAdapter}
              options={companyTypes}
            />
          </div>
          <div className="col-md-12">
            <p className="bold no-margin margin-top-15">Résumé de mes missions</p>
            <Field
              component="textarea"
              className="textarea-form white-background"
              rows="3"
              name={`experiences_attributes[${index}].overview`}
            />
          </div>
          <div 
            className="btn-red-square margin-left-15 margin-top-15"
            onClick={() => deleteExperience(index)}
          >
            Supprimer
          </div>
        </div>
      )
    })

    const renderFormExperiences = () => {
      return(
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              {this.state.add ? renderEditExperiences() : renderEditExperiences() }
              <p className="violet pointer" onClick={addExperience}>+ Ajouter une experience</p>
              <button 
                className="btn-gray-violet margin-top-60"
                >Enregistrer
              </button>
            </form>
          )}
        />
      )
    }
    
    
    const renderExperiences = () => experiences.map((experience, index) => {
      const formatted_starting = `${("0" + (experience.starting.getMonth() + 1)).slice(-2)}/${experience.starting.getFullYear()}`
      const formatted_years = experience.years ? `${("0" + (experience.years.getMonth() + 1)).slice(-2)}/${experience.years.getFullYear()}` : null
      const formatted_date = formatted_years ? `${formatted_starting} - ${formatted_years}` : `${formatted_starting} - Maintenant`
      console.log(formatted_date)
      return(
        <div key={index} className="gray-box-question">
          <p className="bold">{experience.position}</p>
          <div className="flex">
            <FontAwesomeIcon icon={["fas", "suitcase"]} className="gray margin-right-15" />
            <p className="gray margin-right-30">{typeof experience.company_name === "string" ? experience.company_name : experience.company_name.name }</p>
            <FontAwesomeIcon icon={["fas", "calendar"]} className="gray margin-right-15" />
            <p className="gray margin-right-30">{formatted_date}</p>
          </div>
          <p className="no-margin">{experience.overview}</p>
        </div>
      )
    })

    const handleClick = edit => {
      this.setState({edit: !this.state.edit})
    }

    return(
      <div className="gray-border-box">
        <div className="flex space-between">
          <h4 className="box-title">Mes expériences antérieures</h4>
          {userModel == "Talent" ? <p className="pointer" onClick={handleClick}>Éditer</p> : null }
        </div>
        <h5 className="box-subtitle">{`${experiences.length} entreprises`}</h5>
        <div>
          {this.state.edit ? renderFormExperiences() : experiences.length > 0 ? renderExperiences() : null}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    user: state.user,
    companyTypes: state.companyTypes,
    startups: state.startups,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperiencesProfessionnelles);
