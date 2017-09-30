import React from 'react';
import moment from 'moment';
import Day from './Day.jsx';

export default class Days extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const days = this.props.days;
    const weekCount = days.length / 7;
    let classNames = `full-width weeks-${weekCount}`;
    const headers = [0,1,2,3,4,5,6].map(day => moment().day(day).format('dddd'));

    return (
      <ul id="calendar" className={classNames}>
      {headers.map(header => 
        <li className="header" key={header}>{header}</li>
      )}
      {days.map(day =>
        <Day data={day} key={day.moment.toISOString()} />
      )}</ul>
    );
  }
}
