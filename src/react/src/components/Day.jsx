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

    return (
      <div className="day {day.isInMonthRange ? 'thisMonth' : 'other-month'}">
        <span>{day.moment.format('D')}</span>
        <div>{day.items.map(item =>
          <Appointment key={item.date+item.time} data={item} />
        )}</div>
      </div>
    );
  }
}
