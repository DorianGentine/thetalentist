import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr)
 
import "react-datepicker/dist/react-datepicker.css";

// import { fetchGET } from '../../actions';

class RenderDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: this.props.name.includes("years") ? null : new Date(),
    };
  }

  handleChange = (date) => {
    this.setState({startDate: date})
  }

  render () {
    const name = this.props.name

    const ReactDatePickerAdapter = ({input}) => {
      let minDate = false
      return(
          <DatePicker
          {...input}
          selected={this.state.startDate}
          className="edit-gray-box-input"
          dateFormat={this.props.showYearPicker ? "yyyy" : "MM/yyyy" }
          isClearable={input.name.includes('years')}
          minDate={minDate}
          showYearPicker={this.props.showYearPicker}
          showMonthYearPicker={this.props.showMonthYearPicker}
          showFullMonthYearPicker={this.props.showMonthYearPicker}
          onChange={(value) => {
            input.onChange(value)
            this.handleChange(value)
          }}
        />
      )
    }

    return(
      <Field 
        name={name}
        component={ReactDatePickerAdapter}
      />
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     talent: state.talent,
//     user: state.user,
//     companyTypes: state.companyTypes,
//     startups: state.startups,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(null, null)(RenderDatePicker);
