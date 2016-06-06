import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

export default class Appointment extends React.Component {

  onDragStart = ev => {
    ev.dataTransfer.setData('calendar', this.props.data.id); 
  }
  
  render() {
    const {data} = this.props;
    const now = moment(data.date, 'M/D/YYYY').format('YYYY/M');
    const details = `/${now}?detail=${data.id}`;

    return <li classNames="item" draggable="true" onDragStart={this.onDragStart} onClick={this.handleClick}>
      <Link to={details}>{data.title}</Link>
    </li>;
  }
}
