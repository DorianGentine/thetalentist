import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { switchStepFrom } from '../actions';

class MessageMagda extends Component {

  render () {
    const image = "http:\/\/res.cloudinary.com/da4nnrzbu/image/upload/v1583140180/ff0cntbasziwmlmmfuet.jpg"
    const text1 = this.props.text1
    const text2 = this.props.text2 || false
    console.log(text2)

    return(
      <div className="margin-bottom-30">
        <div className="flex align-items-center margin-bottom-15">
          <img className="photo-conv" src={image} alt="avatar"></img>
          <div className="flex-grow-1">
            <p className="bold no-margin">Magdalena Mleczek</p>
            <p className="no-margin italic subtitle">Chouchouteuse de talents @thetalentist</p>
          </div>
        </div>
        <p className="margin-left-55">{text1}</p>
        {text2 ? <p className="margin-left-55">{text2}</p> : null }
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
