import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { openModalTalent, fetchPost, fetchGET } from '../actions';

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
    const relation = talent.relationship
    const pin = {
      talent_id: talent.id,
      headhunter_id: this.props.headhunterId,
    }
    let jobs = this.props.jobs
    let border
    let color = {
      backgroundColor: "lightgray",
      color: "gray",
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

    if(relation === "Pending"){
      border = {
        borderTop: "3px solid lightgray"
      }
    }else if(relation === "Accepter"){
      border = {
        borderTop: "3px solid #000748"
      }
    }

    const renderSmallPlus = () => talent.talent_small_plus.map((smallPlus, index) => <p className="small-plus" key={index}>{smallPlus}</p>)

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
      <div className="col-xs-12 col-md-4">
        <div className="relative card" style={border}>
          {relation !== false &&
            <p className={`text-test absolute ${relation === "pending" ? "gray-background" : "violet-background"}`}>{
              relation === "pending" ? "EN ATTENTE" : `${talent.first_name.toUpperCase()} ${talent.last_name.toUpperCase()}`
            }</p>
          }
          <p className="card-job" style={color}>{talent.job}</p>
          <p className="card-position">{talent.position}</p>
          <p className="card-formation">{`${talent.formations[0].title}${talent.formations[0].type_of_formation != null ? ` - ${talent.formations[0].type_of_formation}` : "" }`}</p>
          <div className="card-grid">
            <p className="grid-title">Expérience:</p>
            <p className="grid-info">{talent.year_experience_job} {talent.year_experience_job === 1 ? "an" : "ans"}</p>
            <p className="grid-title">Rémunération:</p>
            <p className="grid-info">{talent.next_aventure.remuneration}</p>
          </div>
          <div className="margin-top-15 flex flex-wrap card-small-plus">{renderSmallPlus()}</div>
          <div className="flex space-between">
            <FontAwesomeIcon className="card-bookmark" icon={this.state.icon} onClick={toggleIcon} />
            <p className="no-margin card-cta" onClick={() => this.props.openModalTalent(talent)}>Afficher davantage ></p>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
    headhunterId: state.headhunterId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openModalTalent, fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentCard);
