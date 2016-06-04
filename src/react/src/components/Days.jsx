import React from 'react';
import Day from './Day.jsx';

export default class Days extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const days = this.props.days;
    let classNames = 'full-width';

    return (
      <ul id="calendar" className={classNames} >{days.map(day =>
        <Day data={day} key={day.moment.toISOString()} />
      )}</ul>
    );
  }
}
