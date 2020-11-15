import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';

import { fetchGET, fetchPost, updateTalent } from '../../actions';
import valuesToSendFilter from '../../../components/valuesToSendFilter';

import EditCritere from './editCritere'
import CityField from './cityField'

class WhiteBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      image: null,
      newPhoto: null,
      savedTLIds: []
    };
  }

  handleImageChange = (values) => {
    const e = event
    if (e.target.files[0]) {
      this.setState({newInitialCriteres: values})
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
    }
    this.setState({ savedTLIds: savedIds})
  }

  render () {
    // let talent = this.props.talent
    const testTalent = this.props.testTalent
    let user = this.props.user
    let sectors = this.props.sectors
    let languages = this.props.languages
    let initialCriteres = {}
    let userModel
    if(sectors){
      sectors = sectors.sectors
    }
    if(languages){
      languages = languages.languages
    }
    const image = testTalent.image

    const criteres = [
      {
        title: "Expérience",
        answer: `${testTalent.year} ${testTalent.year == 1 ? "an" : "ans"}`,
        name: "talent_job_attributes[year]",
        max: 20
      },{
        title: "Secteurs",
        answer: testTalent.secteurNames,
        name: "next_aventure_attributes[sectors]",
        options: sectors,
        limit: 3
      },{
        title: "Rémunération",
        answer: testTalent.next_aventure_attributes.remuneration,
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
        answer: testTalent.next_aventure_attributes.availability,
        options: [
          "Immédiate",
          "- de 3 mois",
          "+ de 3 mois"
        ],
        limit: 1,
        name: "next_aventure_attributes[availability]"
      },{
        title: "Mobilité",
        answer: testTalent.mobilitiesAnswerTitles,
        options: [
          "Paris",
          "Bordeaux",
          "Nationale",
          "Internationale",
          "Télétravail"
        ],
        limit: 3,
        name: "next_aventure_attributes[mobilities_attributes]"
      },{
        title: "Contrat",
        answer: testTalent.next_aventure_attributes.contrat,
        options: [
          "CDI",
          "CDD",
          "Freelance"
        ],
        limit: 1,
        name: "next_aventure_attributes[contrat]"
      },{
        title: "Langues",
        answer: testTalent.languesNames,
        name: "talent_languages",
        options: languages,
        limit: 3
      }
    ]
    initialCriteres = {
      firstname: testTalent.firstname,
      last_name: testTalent.last_name,
      overview: testTalent.overview,
      city: testTalent.city,
      talent_job_attributes: testTalent.talent_job_attributes,
      next_aventure_attributes: testTalent.next_aventure_attributes,
      talent_languages: testTalent.talent_languages
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
      if(values.city && 
        !values.city.toLowerCase().includes("paris") && 
        !values.city.toLowerCase().includes("bordeaux")){
        if(criteres[4].options.length > 5){
          criteres[4].options[0] = values.city
        }else{
          criteres[4].options.splice(0, 0, values.city)
        }
      }else{
        if(criteres[4].options.length > 5){
          criteres[4].options.splice(0, 1)
        }
      }
      const errors = {}
      return errors
    }

    const onSubmit = values => {
      const infos = {
        values: values,
        initialValues: initialCriteres,
        photo: this.state.newPhoto,
        talent: this.props.talent,
        savedTLIds: this.state.savedTLIds
      }
      // const valuesToSend = valuesFilter(values)
      const valuesToSend = valuesToSendFilter(infos)
      if(Object.keys(valuesToSend).length > 0){
        this.props.fetchPost(`/api/v1/talents/${talent.talent.id}`, valuesToSend, "PATCH", promise => {
          this.props.updateTalent(promise)
          this.props.setInitialValues(promise)
          this.props.setInitialJobs(promise, this.props.jobs)
          this.props.setInitialLanguages(promise, languages)
        })
      }
      this.setState({edit: !this.state.edit})
    }

    const handleClick = () => {
      this.setState({edit: !this.state.edit})
    }

    return(
      <div className="profil-white-box col-md-3">
        {this.state.edit ? 
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={this.state.newInitialCriteres ? this.state.newInitialCriteres : initialCriteres}
            render={({ handleSubmit, values, submitting }) => (
              <form onSubmit={handleSubmit}>
                <label className="margin-bottom-30" htmlFor="avatar" >
                  <p className="criteres">Avatar</p>
                  <div className="flex align-items-center margin-top-15"> 
                    {image || this.state.image ? 
                      <img className="photo-conv photo-conv-lg" src={this.state.image ? this.state.image : image} alt={this.state.newPhoto ? this.state.newPhoto.name : image}></img> 
                      : 
                      <div className="photo-conv photo-conv-lg">{testTalent.firstname.slice(0, 1)}</div>
                    }
                    <p className="no-margin margin-left-15 add-picture">Changer photo</p>
                  </div>
                  <input 
                    type="file"
                    className="hidden" 
                    name="photo" 
                    id="avatar"
                    onChange={() => {this.handleImageChange(values)}}
                  />
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
            <p className="card-job margin-left-auto margin-right-minus-20" style={this.props.color ? this.props.color : {}}>{testTalent.job}</p>
            {image != null ? 
              <img className="photo-conv photo-conv-lg" src={this.state.image ? this.state.image : image} alt="avatar"></img> 
              : 
              <div className="photo-conv photo-conv-lg">{testTalent.firstname.slice(0, 1)}</div>
            }
            <h3>{testTalent.fullName}</h3>
            <p>{testTalent.overview}</p>
            <div className="flex">
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} className="gray margin-right-5" />
              <p className="margin-bottom-45 gray">{testTalent.city}</p>
            </div>

            {criteres.length > 0 ? renderClassicCriteres() : null}
            {userModel == "Talentist" && testTalent.phone ? 
              <div>
                <p className="criteres">Téléphone</p>
                <p className="criteres-reponses">{testTalent.phone}</p>
              </div> 
            : null }
            {userModel == "Talentist" && testTalent.linkedin ? 
              <div>
                <p className="criteres">Linkedin</p>
                <a href={testTalent.linkedin} target="_blank" className="criteres-reponses">Visiter lien</a>
              </div> 
            : null }

            {userModel == "Talent" ?
              <button 
                className="btn-gray-violet margin-top-60"
                onClick={() => {
                  handleClick()
                  this.saveTalentLanguageIds(testTalent.talent_languages)
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
