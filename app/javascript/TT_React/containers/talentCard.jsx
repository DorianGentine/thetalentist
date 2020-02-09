import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { openModalTalent, fetchPost, fetchGET } from '../actions';

import ModalGuide from './modalGuide'

class TalentCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.talent.pin != false,
      icon: ["far", "bookmark"],
    };
  }

  componentDidMount(){
    if(this.state.checked){
      this.setState({ icon: ["fas", "bookmark"] })
    }

    const url = new URL(window.location.href);
    const modal_id = url.searchParams.get("talent");
    if(modal_id == this.props.talent.id){
      this.props.openModalTalent(this.props.talent)
    }
  }

  render () {
    const talent = this.props.talent
    const user = this.props.talents.user
    const relation = talent.relationship
    const pin = {
      talent_id: talent.id,
      headhunter_id: user.id,
    }
    let jobs = this.props.jobs
    let color = {
      backgroundColor: "lightgray",
      color: "gray",
    }
    if(talent.position !== null && talent.position.length >= 30){
      $('[data-toggle="tooltip"]').tooltip()
    }

    if(jobs != null){
      jobs = this.props.jobs.jobs
      if(talent.job.toLowerCase() === jobs[0].title.toLowerCase()){
        color = {
          backgroundColor: "#FCEBEB",
          color: "#FE7373",
        }
      }else if(talent.job.toLowerCase() === jobs[1].title.toLowerCase()){
        color = {
          backgroundColor: "#DFDEFE",
          color: "#5F5DDA",
        }
      }else if(talent.job.toLowerCase() === jobs[2].title.toLowerCase()){
        color = {
          backgroundColor: "#FFF7E2",
          color: "#FFAC4B",
        }
      }else if(talent.job.toLowerCase() === jobs[3].title.toLowerCase()){
        color = {
          backgroundColor: "#EDF4FE",
          color: "#6A9FE2",
        }
      }else if(talent.job.toLowerCase() === jobs[4].title.toLowerCase()){
        color = {
          backgroundColor: "#FCEBEB",
          color: "#FE7373",
        }
      }else if(talent.job.toLowerCase() === jobs[5].title.toLowerCase()){
        color = {
          backgroundColor: "#DFDEFE",
          color: "#5F5DDA",
        }
      }
    }

    let border = {
      border: `1px solid ${color.color}`,
    }
    if(relation === "pending"){
      border = {
        border: `1px solid ${color.color}`,
        borderTop: "1px solid lightgray"
      }
    }else if(relation === "Accepter"){
      border = {
        border: `1px solid ${color.color}`,
        borderTop: "1px solid #000748"
      }
    }

    const renderSmallPlus = () => {
      if(talent.talent_small_plus.length !== 0 && !talent.talent_small_plus.includes(null)){
        if(talent.talent_small_plus.length == 1 && talent.talent_small_plus[0].includes(',')){
          let small_plus = talent.talent_small_plus[0].split(", ")
          for (let i = small_plus.length - 1; i >= 0; i--) {
            if(small_plus[i].includes('○')){
              let small_with_round = small_plus[i].split(' ○ ')
              small_plus.splice(i, 1)
              for (var j = small_with_round.length - 1; j >= 0; j--) {
                small_plus.splice(i, 0, small_with_round[j])
              }
            }
          }
          return small_plus.map((smallPlus, index) => <p className="small-plus" key={index}>{smallPlus.substr(0, 35)}</p>)
        }else{
          return talent.talent_small_plus.map((smallPlus, index) => <p className="small-plus" key={index}>{smallPlus.substr(0, 35)}</p>)
        }
      }
    }
    const renderKnowns = () => talent.knowns.map((known, index) => <p className="small-plus" key={index}>{known}</p>)

    const toggleIcon = () => {
      if(this.state.checked){
        const url = `/api/v1/pins/${talent.pin}`
        this.props.fetchPost(url, null, "DELETE", this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS"))
        this.setState({
          checked: false,
          icon: ["far", "bookmark"]
        })
      }else{
        this.props.fetchPost(
          '/api/v1/pins',
          pin,
          "POST",
          this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS")
        )
        this.setState({
          checked: true,
          icon: ["fas", "bookmark"]
        })
      }
    }

    return(
      <div className="col-xs-12 col-md-4 card-width">
        <div className="relative card" style={border}>
          {relation !== false && relation !== null || user.admin ?
            <p className={`text-test absolute ${relation === "pending" ? "gray-background" : "violet-background"}`}>{
              relation === "pending" ? "EN ATTENTE" : `${talent.first_name.toUpperCase()} ${talent.last_name.toUpperCase()}`
            }</p>
          : null }
          <div className="flex space-between">
            <p className="card-job" style={color}>{talent.job}</p>
            <FontAwesomeIcon className="card-bookmark" icon={this.state.icon} onClick={toggleIcon} />
          </div>
          {talent.position !== null && talent.position.length >= 30 ?
            <p className="card-position" data-toggle="tooltip" data-placement="top" title={talent.position}>{talent.position.substr(0, 30)}</p>
          : <p className="card-position">{talent.position}</p> }
          <p className="card-formation">{`${talent.formations[0] != undefined ?
            `${talent.formations[0].title}${talent.formations[0].type_of_formation != null ? ` - ${talent.formations[0].type_of_formation}` : "" }`
            : ""}`}</p>
          <div className="card-grid">
            <p className="grid-title">Expérience:</p>
            <p className="grid-info">{talent.year_experience_job} {talent.year_experience_job === 1 ? "an" : "ans"}</p>
            <p className="grid-title">Rémunération:</p>
            <p className="grid-info">{talent.next_aventure.remuneration}</p>
          </div>
          <div className="margin-top-15 flex flex-wrap card-small-plus">{talent.knowns.length != 0 ? renderKnowns() : renderSmallPlus()}</div>
          <div className="flex flex-end relative">
            <p className="no-margin card-cta" onClick={() => this.props.openModalTalent(talent)}>Afficher davantage</p>
            {this.props.guideSu == 3 && this.props.index == 0 ? <ModalGuide /> : null}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
    talents: state.talents,
    guideSu: state.guideSu,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openModalTalent, fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentCard);
