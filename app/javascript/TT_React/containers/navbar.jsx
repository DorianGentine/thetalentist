import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../actions';

class Navbar extends Component {

  // <%= link_to root_path, class: "navbar-talentist-logo" do %>
  //   <%= image_tag "Logo The talentist-02.png", height: 50 %>
  // <% end %>
  render () {
    return(
      <div>
          <div className="navbar-wagon">
            <a href="/" className="navbar-talentist-logo">
              <img src="Logo The talentist-02.png" alt=""/>
            </a>
          </div>

      </div>
    );
  }
};
          // <div style={{marginTop: "70px"}}></div>

function mapStateToProps(state) {
  return {
    talents: state.talents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
