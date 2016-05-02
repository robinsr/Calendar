import React from 'react';
import Day from './Day.jsx';

export default class Days extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const days = this.props.days;

    return (
      <div>{days.map(day =>
        <Day data={day} key={day.moment.toISOString()} />
      )}</div>
    );
  }
}
