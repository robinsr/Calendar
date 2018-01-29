import React from 'react';
import moment from 'moment';
import AppointmentStore from '../stores/AppointmentStore';
import { Link } from 'react-router';
import $ from 'jquery';
import fancybox from 'fancybox';
fancybox($);

export default class Fancybox extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.selected) {
      $.fancybox( {
        content: $( this.refs.fancyboxElem ),
        modal: true,
        hideOnContentClick: true,
        showCloseButton: true
      } );
    } else {
      $.fancybox.close();
    }
  }

  render() {
    const divStyle = {
      display: 'none'
    };

    if (this.props.selected) {
      console.log(this.props)
      const {title, date, time, description} = this.props.selected;
      const backLink = `/${moment(date, 'M/D/YYYY').format('YYYY/M')}`;
      return (
        <div id="eventDetails" style={divStyle} ref="fancyboxElem">
          <p className="eventDetailsItem">title:</p><span>{ title }</span><br />
          <p className="eventDetailsItem">date:</p><span>{ date }</span><br />
          <p className="eventDetailsItem">time:</p> <span>{ time }</span><br />
          <p className="eventDetailsItem">description:</p><span>{ description }</span><br />
          <div className="closeModal">
            <p><Link to={backLink}>click here to close</Link></p>
          </div>
        </div>
      );
    } else {
      return (<div id="eventDetails" style={divStyle}></div>)
    }
  }
}
