import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateTalents } from '../actions';

class FiltreItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    };
  }

  componentDidMount(){
    const url = new URL(window.location.href);
    const metierActif = url.searchParams.get("metier");
    if(metierActif){
      let i = 0
      let intervalFilter = setInterval(() => {
        i++
        if(metierActif.toLowerCase() == this.props.job.title.toLowerCase() && this.props.talents != null){
          this.setState({ checked: true })
          this.props.updateFilter(this.props.job.title.toLowerCase())
          clearInterval(intervalFilter)
        }else if(this.props.talents != null || i > 10){
          clearInterval(intervalFilter)
        }
      }, 1000)
    }
  }


  render () {
    const job = this.props.job
    const remuneration = this.props.remuneration
    const mobility = this.props.mobility
    const filter = this.props.filter
    
    let title, selectedFilter
    if(job){
      title = job.title
      selectedFilter = filter.jobFilter
    }else if(remuneration){
      title = remuneration
      selectedFilter = filter.remFilter
    }else if(mobility){
      title = mobility
      selectedFilter = filter.mobilityFilter
    }

    const handleChange = (checked) => {
      this.setState({ checked: event.target.checked })
      this.props.updateTalents(-1)
      let selectedFilterUpdated
      if(selectedFilter.includes(title.toLowerCase())){
        selectedFilterUpdated = selectedFilter.filter(index => index !== title.toLowerCase())
      }else{
        selectedFilterUpdated = selectedFilter.concat(title.toLowerCase())
      }
      if(job){
        filter.jobFilter = selectedFilterUpdated
      }else if(remuneration){
        filter.remFilter = selectedFilterUpdated
      }else if(mobility){
        filter.mobilityFilter = selectedFilterUpdated
      }
      this.props.updateFilter(filter)
    }

    return (
      <div>
        <label className="checkbox-react">{title}
          <input
              type="checkbox"
              className="no-margin margin-right-15"
              checked={this.state.checked}
              id={title}
              onChange={() => {handleChange(this.state.checked)}}
            />
          <span className="checkmark"></span>
        </label>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    talents: state.talents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateTalents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltreItem);
