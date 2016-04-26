import React from 'react';
import Day from './Day.jsx';

import Radium from 'radium';

const styles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
};

@Radium
export default class Days extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const days = this.props.days;

    return (
      <div style={styles}>{days.map(day =>
        <Day data={day} key={day.moment.toISOString()} />
      )}</div>
    );
  }
}
