import React from 'react';
import Appointment from './Appointment.jsx';
import AppointmentActions from '../actions/AppointmentActions';

export default class Day extends React.Component {
  state = {
    in: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      in: true
    });
  }

  preventDefault = ev => {
    ev.preventDefault();
  }

  drop = ev => {
    const sourceId = ev.dataTransfer.getData('calendar');
    const date = this.props.data.moment.format('M/D/YYYY');
    AppointmentActions.move({sourceId, date});
  }

  render() {
    const day = this.props.data;
    const className = `day in ${day.isInMonthRange ? 'this-month' : 'other-month'}`;

    return (
      <li className={className} onDragOver={this.preventDefault} onDrop={this.drop}>
        <p className="date">{day.moment.format('D')}</p>
        <ul>{day.items.map(item =>
          <Appointment key={item.date+item.time} data={item} />
        )}</ul>
      </li>
    );
  }
}
