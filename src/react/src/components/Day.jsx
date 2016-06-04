import React from 'react';
import Appointment from './Appointment.jsx';

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

  render() {
    const day = this.props.data;
    const className = `day in ${day.isInMonthRange ? 'this-month' : 'other-month'}`;

    return (
      <li className={className}>
        <p className="date">{day.moment.format('D')}</p>
        <ul>{day.items.map(item =>
          <Appointment key={item.date+item.time} data={item} />
        )}</ul>
      </li>
    );
  }
}
