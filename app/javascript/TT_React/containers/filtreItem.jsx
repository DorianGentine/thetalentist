import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateFilter } from '../actions';

class FiltreItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    };
  }

  render () {
    const job = this.props.job
    const handleChange = (checked) => {
      this.setState({ checked: event.target.checked })
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

// function mapStateToProps(state) {
//   return {
//     filter: state.filter,
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFilter }, dispatch);
}

export default connect(null, mapDispatchToProps)(FiltreItem);
