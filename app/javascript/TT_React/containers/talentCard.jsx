import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { openModalTalent } from '../actions';

class TalentCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.talent.pin,
      icon: ["far", "bookmark"],
    };
  }

  componentDidMount(){
    if(this.state.checked){
      this.setState({ icon: ["fas", "bookmark"] })
    }
  }

  render () {
    const talent = this.props.talent
    const jobs = this.props.jobs
    const relation = talent.relationship
    let border
    let color = {
      backgroundColor: "lightgray",
      color: "gray",
    }

    if(talent.job.toLowerCase() === "product"){
      color = {
        backgroundColor: "#FCEBEB",
        color: "#FE7373",
      }
    }else if(talent.job.toLowerCase() === "finances"){
      color = {
        backgroundColor: "#DFDEFE",
        color: "#5F5DDA",
      }
    }else if(talent.job.toLowerCase() === "market"){
      color = {
        backgroundColor: "#FFF7E2",
        color: "#FFAC4B",
      }
    }else if(talent.job.toLowerCase() === "operations"){
      color = {
        backgroundColor: "#EDF4FE",
        color: "#6A9FE2",
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

    const renderSmallPlus = () => talent.talent_small_plus.map((smallPlus, index) => <p className="small-plus" key={index}>{smallPlus.description}</p>)

    const toggleIcon = () => {
      if(this.state.checked){
        this.setState({
          checked: false,
          icon: ["far", "bookmark"]
        })
      }else{
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openModalTalent }, dispatch);
}

export default connect(null, mapDispatchToProps)(TalentCard);
