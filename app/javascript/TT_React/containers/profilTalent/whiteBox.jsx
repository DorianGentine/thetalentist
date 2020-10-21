import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';

import { fetchGET, fetchPost, updateTalent } from '../../actions';

import EditCritere from './editCritere'
import CityField from './cityField'

class WhiteBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      image: null,
      newPhoto: null,
      savedTLIds: null
    };
  }

  componentDidMount() {
    if (!this.props.sectors) {
      this.props.fetchGET('/api/v1/sectors', "FETCH_SECTORS")
    }
    if (!this.props.languages) {
      this.props.fetchGET('/api/v1/languages', "FETCH_LANGUAGES")
    }
  }

  handleImageChange = (e, image) => {
    if (e.target.files[0]) {
      console.log('e.target.files[0]', e.target.files[0])
      let fReader = new FileReader();
      const that = this
      fReader.onload = function(event){
        that.setState({ image: event.target.result })
      }
      fReader.readAsDataURL(e.target.files[0]);
      this.setState({ newPhoto: e.target.files[0] });
    }
  };

  saveTalentLanguageIds = (talent_languages) => {
    const savedIds = []
    if(talent_languages){
      for (let i = 0; i < talent_languages.length; i++) {
        const tl = talent_languages[i];
        savedIds[i] = tl.id
      }
      console.log('savedIds', savedIds)
    }
    this.setState({ savedTLIds: savedIds})
  }

  render () {
    let talent = this.props.talent
    let user = this.props.user
    let sectors = this.props.sectors
    let languages = this.props.languages
    let fullName = "Chargement...", image = null, firstname = " ", overview, city, remuneration, availability, mobilities, mobilitiesAnswerTitles, mobilitiesTitles = [], job, color = [], secteurNames, talent_sectors, criteres = [], initialCriteres = {}, year, jobId, contrat, languesNames, talent_languages
    let userModel
    if(sectors){
      sectors = sectors.sectors
    }
    if(languages){
      languages = languages.languages
    }
    if(talent){
      if(talent.talent_languages && languages){
        for (let i = 0; i < talent.talent_languages.length; i++) {
          const language = talent.talent_languages[i];
          const langue = languages.find(l => language.language_id === l.id)
          language.title = langue.title
          languesNames = `${talent.talent_languages[0] ? talent.talent_languages[0].title : ""}${talent.talent_languages[1] ? `, ${talent.talent_languages[1].title}` : ""}${talent.talent_languages[2] ? `, ${talent.talent_languages[2].title}` : ""}`
          talent_languages = talent.talent_languages
        }
      }
      job = talent.jobs[0] ? talent.jobs[0].title : "Non Défini"
      color = this.props.color
      firstname = talent.talent.firstname
      fullName = `${firstname} ${talent.talent.last_name}`
      overview = talent.talent.overview
      if(!overview && talent.experiences.length != 0){
        overview = talent.experiences[0].position
      }
      city = talent.talent.city
      year = talent.job ? talent.job.year : 0
      jobId = talent.job ? talent.job.job_id : null
      if(this.props.jobs){
        jobId = this.props.jobs.jobs.find(job => job.id === jobId)
      }
      image = talent.talent.photo.url
      secteurNames = `${talent.sectors[0] ? talent.sectors[0].title : ""}${talent.sectors[1] ? `, ${talent.sectors[1].title}` : ""}${talent.sectors[2] ? `, ${talent.sectors[2].title}` : ""}`
      talent_sectors = talent.sectors
      remuneration = talent.next_aventure.remuneration
      availability = talent.next_aventure.availability
      mobilities = talent.mobilities
      mobilities.map((mobility, index) => {
        mobilitiesTitles[index] = mobility.title
      })
      mobilitiesAnswerTitles = `${mobilities[0] ? mobilities[0].title : ""}${mobilities[1] ? `, ${mobilities[1].title}` : ""}${mobilities[2] ? `, ${mobilities[2].title}` : ""}`
      contrat = talent.next_aventure.contrat
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
            "60 à 70k€",
            "70 à 80k€",
            "80 à 90k€",
            "90 à 100k€",
            "100 à 150k€",
            "+150k€"
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
          answer: mobilitiesAnswerTitles,
          value: mobilitiesTitles,
          options: [
            undefined,
            "Paris",
            "Bordeaux",
            "Nationale",
            "Télétravail"
          ],
          limit: 3,
          name: "next_aventure_attributes[mobilities_attributes]"
        },{
          title: "Contrat",
          answer: contrat,
          value: contrat,
          options: [
            "CDI",
            "CDD",
            "Freelance"
          ],
          limit: 1,
          name: "next_aventure_attributes[contrat]"
        },{
          title: "Langues",
          answer: languesNames,
          value: talent_languages,
          name: "talent_languages",
          options: languages,
          limit: 3
        }
      ]
      initialCriteres = {
        firstname: talent.talent.firstname,
        last_name: talent.talent.last_name,
        overview: overview,
        city: talent.talent.city,
        talent_job_attributes: {
          id: talent.job ? talent.job.id : null,
          job_id: jobId,
          year: talent.job ? talent.job.year : 0
        },
        next_aventure_attributes: {
          id: talent.next_aventure.id,
          remuneration: [talent.next_aventure.remuneration],
          availability: [talent.next_aventure.availability],
          sectors: talent_sectors,
          contrat: [talent.next_aventure.contrat],
          mobilities_attributes: mobilitiesTitles,
        },
        talent_languages: talent_languages
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
      let firstChoice = values.city
      if(values.city.toLowerCase().includes("paris") || 
        values.city.toLowerCase().includes("bordeaux")){
        firstChoice = undefined
      }
      criteres[4].options[0] = firstChoice
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

      // MEP photo
      if(this.state.newPhoto){
        const formData = new FormData();
        console.log('this.state.newPhoto', this.state.newPhoto)
        formData.append("photo", this.state.newPhoto);
        fetch(`/api/v1/talents/${talent.talent.id}/update_avatar`, {method: "PATCH", body: formData})
          .then(r => {
            console.log('result', r)
          })
      }
      // MEP job_id
      if(valuesToSend.talent_job_attributes && valuesToSend.talent_job_attributes.job_id){
        if(valuesToSend.talent_job_attributes.job_id[0]){
          valuesToSend.talent_job_attributes.job_id = valuesToSend.talent_job_attributes.job_id[0].id
        }else{
          valuesToSend.talent_job_attributes.job_id = valuesToSend.talent_job_attributes.job_id.id
        }
      }
      // MEP availability
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.availability){
        valuesToSend.next_aventure_attributes.availability = valuesToSend.next_aventure_attributes.availability[0]
      }
      // MEP mobilities
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.mobilities_attributes){
        for (let i = 0; i < valuesToSend.next_aventure_attributes.mobilities_attributes.length; i++) {
          const mobility = valuesToSend.next_aventure_attributes.mobilities_attributes[i];
          console.log('mobility', mobility)
          let mobility_id
          if(this.props.talent.mobilities[i]){
            mobility_id = this.props.talent.mobilities[i].id
          }
          valuesToSend.next_aventure_attributes.mobilities_attributes[i] = {
            id: mobility_id,
            title: mobility,
            next_aventure_id: this.props.talent.next_aventure.id,
          }
        }
        for (let i = 0; i < this.props.talent.mobilities.length; i++) {
          const initialMobility = this.props.talent.mobilities[i];
          const mobility = valuesToSend.next_aventure_attributes.mobilities_attributes[i];
          if(!mobility){
            valuesToSend.next_aventure_attributes.mobilities_attributes[i] = {
              id: initialMobility.id,
              _destroy: true
            }
          }
        }
      }
      // MEP remuneration
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.remuneration){
        valuesToSend.next_aventure_attributes.remuneration = valuesToSend.next_aventure_attributes.remuneration[0]
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
      // MEP contrat
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.contrat){
        valuesToSend.next_aventure_attributes.contrat = valuesToSend.next_aventure_attributes.contrat[0]
      }
      // MEP languages
      if(valuesToSend.talent_languages){
        const languages = valuesToSend.talent_languages
        valuesToSend.talent_languages_attributes = []
        if (languages.length == this.state.savedTLIds.length) {
          for (let i = 0; i < languages.length; i++) {
            const language = languages[i];
            if(language.language_id){
              valuesToSend.talent_languages_attributes[i] = {id: this.state.savedTLIds[i], language_id: language.language_id}
            }else{
              valuesToSend.talent_languages_attributes[i] = {id: this.state.savedTLIds[i], language_id: language.id}
            }
          }
        }else if(languages.length < this.state.savedTLIds.length){
          for (let i = 0; i < this.state.savedTLIds.length; i++) {
            const savedTLid = this.state.savedTLIds[i];
            const language = languages[i];
            if(language){
              if(language.language_id){
                valuesToSend.talent_languages_attributes[i] = {id: savedTLid, language_id: language.language_id}
              }else{
                valuesToSend.talent_languages_attributes[i] = {id: savedTLid, language_id: language.id}
              }
            }else{
              valuesToSend.talent_languages_attributes[i] = {id: savedTLid, _destroy: true}
            }
          }
        }else{
          for (let i = 0; i < languages.length; i++) {
            const language = languages[i];
            const savedTLid = this.state.savedTLIds[i];
            if(savedTLid){
              if(language.language_id){
                valuesToSend.talent_languages_attributes[i] = {id: savedTLid, language_id: language.language_id}
              }else{
                valuesToSend.talent_languages_attributes[i] = {id: savedTLid, language_id: language.id}
              }
            }else{
              if(language.language_id){
                valuesToSend.talent_languages_attributes[i] = {id: language.id, language_id: language.language_id}
              }else{
                valuesToSend.talent_languages_attributes[i] = {language_id: language.id}
              }
            }
          }
        }
        delete valuesToSend['talent_languages']
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
                <label className="margin-bottom-30" htmlFor="avatar" >
                  <p className="criteres">Avatar</p>
                  <div className="flex align-items-center margin-top-15">  
                    {image != null ? 
                      <img className="photo-conv photo-conv-lg" src={this.state.image ? this.state.image : image} alt={image ? image : values.photo.slice(12)}></img> 
                      : 
                      <div className="photo-conv photo-conv-lg">{firstname.slice(0, 1)}</div>
                    }
                    <p className="no-margin margin-left-15 add-picture">{values.photo ? values.photo.slice(12) : "Changer photo" }</p>
                  </div>
                  <Field name="photo">
                    {({ input, meta }) => (
                      <input {...input} 
                        className="hidden" 
                        id="avatar" 
                        component="input" 
                        type="file" 
                        onChange={() => {
                          this.handleImageChange(event, image)
                          // input.onChange(event.target.files[0].name)
                        }} />
                    )}
                  </Field>
                </label>
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
                <Field name="overview">
                  {({ input, meta }) => (
                    <div>
                      <p className="criteres">Poste</p>
                      <input {...input} type="text" className="criteres-input" />
                      {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
                    </div>
                  )}
                </Field>
                <EditCritere critere={{title: "Métier", name: "talent_job_attributes.job_id", options: this.props.jobs.jobs || [], limit: 1}} formValue={values} />
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
              <img className="photo-conv photo-conv-lg" src={this.state.image ? this.state.image : image} alt="avatar"></img> 
              : 
              <div className="photo-conv photo-conv-lg">{firstname.slice(0, 1)}</div>
            }
            <h3>{fullName}</h3>
            <p>{overview ? overview : "❌ À renseigner ❌"}</p>
            <div className="flex">
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} className="gray margin-right-5" />
              <p className="margin-bottom-45 gray">{city}</p>
            </div>

            {criteres.length > 0 ? renderClassicCriteres() : null}
            {userModel == "Talentist" && talent ? 
              <div>
                <p className="criteres">Téléphone</p>
                <p className="criteres-reponses">{talent.talent.phone}</p>
              </div> 
            : null }
            {userModel == "Talentist" && talent ? 
              <div>
                <p className="criteres">Linkedin</p>
                <a href={talent.talent.linkedin} target="_blank" className="criteres-reponses">Visiter lien</a>
              </div> 
            : null }

            {userModel == "Talent" || userModel == "Talentist" ?
              <button 
                className="btn-gray-violet margin-top-60"
                onClick={() => {
                  handleClick()
                  this.saveTalentLanguageIds(talent_languages)
                }}
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
    sectors: state.sectors,
    languages: state.languages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, updateTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WhiteBox);
