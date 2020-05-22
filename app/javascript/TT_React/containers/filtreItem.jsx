import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateFilter, updateTalents } from '../actions';

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
    const handleChange = (checked) => {
      this.setState({ checked: event.target.checked })
      this.props.updateTalents(-1)
      this.props.updateFilter(this.props.job.title.toLowerCase())
    }

    return (
      <div>
        <label className="checkbox-react">{job.title}
          <input
              type="checkbox"
              className="no-margin margin-right-15"
              checked={this.state.checked}
              id={job.title}
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
  return bindActionCreators({ updateFilter, updateTalents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltreItem);
