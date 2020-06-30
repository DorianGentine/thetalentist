import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';

import { fetchGET, fetchPost, updateTalent } from '../../actions';
import setJobColor from '../../../components/setJobColor';

import EditCritere from './editCritere'
import CityField from './cityField'

class WhiteBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    };
  }

  componentDidMount() {
    if(!this.props.jobs){
      this.props.fetchGET('/api/v1/jobs', "FETCH_JOBS")
    }
    if (!this.props.sectors) {
      this.props.fetchGET('/api/v1/sectors', "FETCH_SECTORS")
    }
  }
  

  render () {
    let talent = this.props.talent
    let user = this.props.user
    let sectors = this.props.sectors
    let fullName = "Chargement...", image = null, firstname = " ", city, experience = {}, remuneration, availability, mobility, job, color = [], secteurNames, talent_sectors, criteres = [], initialCriteres = {}, year
    let userModel
    if(sectors){
      sectors = sectors.sectors
    }
    if(talent){
      job = talent.jobs[0].title
      color = setJobColor(job, this.props.jobs)
      firstname = talent.talent.firstname
      fullName = `${firstname} ${talent.talent.last_name}`
      city = talent.talent.city
      year = talent.job.year
      secteurNames = `${talent.sectors[0] ? talent.sectors[0].title : ""}${talent.sectors[1] ? `, ${talent.sectors[1].title}` : ""}${talent.sectors[2] ? `, ${talent.sectors[2].title}` : ""}`
      talent_sectors = talent.sectors
      remuneration = talent.next_aventure.remuneration
      availability = talent.next_aventure.availability
      mobility = talent.mobilities[0]
      if(talent.experiences.length != 0){
        experience = talent.experiences
      }else{
        experience = [{
          company_name: "À renseigner",
          position: null,
          starting: new Date(),
          currently: true
        }]
      }
      criteres = [
        {
          title: "Expérience",
          answer: `${year} ${year == 1 ? "an" : "ans"}`,
          value: `${year} ${year == 1 ? "an" : "ans"}`,
          name: "talent_job_attributes[year]",
          max: 20
        },{
          title: "Secteurs",
          answer: secteurNames,
          value: talent_sectors,
          name: "next_aventure_attributes[sectors]",
          options: sectors,
          limit: 3
        },{
          title: "Rémunération",
          answer: remuneration,
          value: remuneration,
          options: [
            "-30k€",
            "30k€ à 40k€",
            "40k€ à 50k€",
            "50k€ à 60k€",
            "+60k€"
          ],
          limit: 1,
          name: "next_aventure_attributes[remuneration]"
        },{
          title: "Disponibilité",
          answer: availability,
          value: availability,
          options: [
            "Immédiate",
            "- de 3 mois",
            "+ de 3 mois"
          ],
          limit: 1,
          name: "next_aventure_attributes[availability]"
        },{
          title: "Mobilité",
          answer: mobility.title,
          value: mobility.title,
          options: [
            talent.talent.city,
            "Paris",
            "Nationale",
            "Internationale"
          ],
          limit: 1,
          name: "next_aventure_attributes[mobilities_attributes][0][title]"
        }
      ]
      initialCriteres = {
        firstname: talent.talent.firstname,
        last_name: talent.talent.last_name,
        city: talent.talent.city,
        experiences_attributes: experience,
        talent_job_attributes: {
          id: talent.job.id,
          year: talent.job.year
        },
        next_aventure_attributes: {
          id: talent.next_aventure.id,
          remuneration: [talent.next_aventure.remuneration],
          availability: [talent.next_aventure.availability],
          sectors: talent_sectors,
          mobilities_attributes: [{
            id: mobility.id,
            title: [mobility.title]
          }],
        },
      }
    }
    if(user){
      userModel = user.is_a_model
    }
    
    const renderClassicCriteres = () => criteres.map((critere, index) => {
      return(
        <div key={index}>
          <p className="criteres">{critere.title}</p>
          <p className="criteres-reponses">{critere.answer}</p>
        </div>
      )
    })
    
    const renderEditCriteres = values => criteres.map((critere, index) => {
      return(
        <EditCritere key={index} critere={critere} formValue={values} />
      )
    })

    const validate = values => {
      console.log('values', values)
      const errors = {}
      return errors
    }

    const valuesFilter = values => {
      const valuesToSend = {}
      const initialValues = initialCriteres
      Object.keys(values).forEach(value => {
        if(initialValues[value] !== values[value]){
          valuesToSend[value] = JSON.parse(JSON.stringify(values[value]))
        }
      })
      // MEP availability
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.availability){
        valuesToSend.next_aventure_attributes.availability = valuesToSend.next_aventure_attributes.availability[0]
      }
      // MEP remuneration
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.remuneration){
        valuesToSend.next_aventure_attributes.remuneration = valuesToSend.next_aventure_attributes.remuneration[0]
      }
      // MEP mobilities_attributes[0].title
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.mobilities_attributes[0].title){
        valuesToSend.next_aventure_attributes.mobilities_attributes[0].title = valuesToSend.next_aventure_attributes.mobilities_attributes[0].title[0]
      }
      // MEP sector_ids
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.sectors){
        const sectors = valuesToSend.next_aventure_attributes.sectors
        valuesToSend.next_aventure_attributes.sector_ids = []
        for (let i = 0; i < sectors.length; i++) {
          const sector = sectors[i];
          valuesToSend.next_aventure_attributes.sector_ids[i] = sector.id
        }
        delete valuesToSend.next_aventure_attributes['sectors']
      }

      this.props.updateTalent(this.props.talent, valuesToSend, values)
      initialCriteres = values
      return valuesToSend
    }

    const onSubmit = values => {
      const valuesToSend = valuesFilter(values)
      console.log('valuesToSend', valuesToSend)
      if(Object.keys(valuesToSend).length > 0){
        this.props.fetchPost(`/api/v1/talents/${talent.talent.id}`, valuesToSend, "PATCH")
      }
      this.setState({edit: !this.state.edit})
    }

    const handleClick = () => {
      this.setState({edit: !this.state.edit})
    }

    return(
      <div className="profil-white-box col-md-3">
        <p className="card-job margin-left-auto margin-right-minus-20" style={color}>{job}</p>
        {this.state.edit && talent ? 
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialCriteres}
            render={({ handleSubmit, values, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field name="firstname">
                  {({ input, meta }) => (
                    <div>
                      <p className="criteres">Prénom</p>
                      <input {...input} type="text" className="criteres-input" />
                      {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
                    </div>
                  )}
                </Field> 
                <Field name="last_name">
                  {({ input, meta }) => (
                    <div>
                      <p className="criteres">Nom</p>
                      <input {...input} type="text" className="criteres-input" />
                      {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
                    </div>
                  )}
                </Field> 
                <Field name="experiences_attributes[0][position]">
                  {({ input, meta }) => (
                    <div>
                      <p className="criteres">Poste</p>
                      <input {...input} type="text" className="criteres-input" />
                      {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
                    </div>
                  )}
                </Field>
                <CityField formValue={values} />
                {criteres.length > 0 ? renderEditCriteres(values) : null}
                <button 
                  className="btn-gray-violet margin-top-60"
                  >Enregistrer
                </button>
              </form>
            )}
          />
        :
          <div>
            {image != null ? 
              <img className="photo-conv photo-conv-lg" src={image} alt={values.photo.slice(12)}></img> 
              : 
              <div className="photo-conv photo-conv-lg">{firstname.slice(0, 1)}</div>
            }
            <h3>{fullName}</h3>
            <p>{experience[0] && experience[0].position ? experience[0].position : "❌ À renseigner ❌"}</p>
            <div className="flex">
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} className="gray margin-right-5" />
              <p className="margin-bottom-45 gray">{city}</p>
            </div>

            {criteres.length > 0 ? renderClassicCriteres() : null}

            {userModel == "Talent" ?
              <button 
                className="btn-gray-violet margin-top-60"
                onClick={handleClick}
                >Modifier
              </button>
            :
              <button className="btn-gray-violet margin-top-60">Envoyer un message</button>
            }
          </div>
        }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    jobs: state.jobs,
    user: state.user,
    sectors: state.sectors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, updateTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WhiteBox);
