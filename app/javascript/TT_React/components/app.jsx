import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchAPI } from '../actions';

class App extends Component {

  render () {
    return(
      <div>
        <h1 className="no-margin">Hello {this.props.name}</h1>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     api: state.api,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchAPI }, dispatch);
// }

export default App;
