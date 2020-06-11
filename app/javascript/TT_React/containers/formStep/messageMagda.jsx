import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { switchStepFrom } from '../actions';
import photoMagda from "../../../../assets/images/photo-magda.jpg"


class MessageMagda extends Component {

  render () {
    const image = photoMagda
    const text1 = this.props.text1
    const text2 = this.props.text2 || false
    const text3 = this.props.text3 || false

    return(
      <div className="margin-bottom-30">
        <div className="flex align-items-center margin-bottom-15">
          <img className="photo-conv" src={image} alt="avatar"></img>
          <div className="flex-grow-1">
            <p className="bold no-margin">Magdalena Mleczek</p>
            {/* <p className="no-margin italic subtitle">Chouchouteuse de talents @thetalentist</p> */}
          </div>
        </div>
        <p className="margin-left-55">{text1}</p>
        {text2 ? <p className="margin-left-55">{text2}</p> : null }
        {text3 ? <p className="margin-left-55 italic">{text3}</p> : null }
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     stepForm: state.stepForm,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(null, null)(MessageMagda);
