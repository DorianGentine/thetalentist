import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateFilter } from '../actions';

class FiltreItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classList: "pointer",
    };
  }

  handleClick = () => {
    this.props.updateFilter(this.props.job.title.toLowerCase())
    if(this.props.filter.includes(this.props.job.title.toLowerCase())){
      this.setState(prevState => ({this.state.classList: prevState.classList + " green"}))
    }
    console.log()
  }

  render () {
    const job = this.props.job

    return <label onClick={this.handleClick} className={this.state.classList}>{job.title.toUpperCase()}</label>;
  }
};

function mapStateToProps(state) {
  return {
    filter: state.filter,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltreItem);
