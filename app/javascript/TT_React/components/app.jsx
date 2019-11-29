import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchAPI } from '../actions';

class App extends Component {

  render () {
    const renderTalents = () => {
      return (
        <div className="flex" key={index}>
          <p className="col-lg-12 font-12 black margin-bottom-15">Salut</p>
        </div>
      )
      // this.props.talents.map((talent, index) => <talentCard talent={talent} key={index} />)
    }

    return(
      <div id="all-talents" data-company_id={this.props.companyId}>
        <h1 className="no-margin">Hello {this.props.companyId}</h1>
        <section className="container margin-bottom-30" style={{minHeight: "calc(100vh - 240px)"}}>
          <p id="search-results"><strong>XXX Profils</strong> corrsepondent à votre recherche</p>
        </section>
        <div className="row">
          {this.props.talents != null ? renderTalents() : <p>Chargement...</p>}
        </div>

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
