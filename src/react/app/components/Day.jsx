import React from 'react';
import Radium from 'radium';

const $stickNoteIn = '#efe0a5';
const $stickyNoteOut = '#777';

const styles = {
  base: {
    width: `${(100/7).toString()}%`,
    borderRadius: '3px',
    borderBottomRightRadius: '0px',
    boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
    opacity: '0',
    transition: 'transform 1s, opacity 1s',
    transform: 'translateY(30px)'
  },

  otherMonth: {
    backgroundColor: $stickyNoteOut
  },

  thisMonth: {
    backgroundColor: $stickNoteIn
  },

  in: {
    transform: 'translateY(0)',
    opacity: '1'
  }

  // &.out {
  //   transition: transform 1s, opacity 1s;
  //   transform: translateY(-30px);
  //   opacity: 0;
  // }
}

@Radium
export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false
    };
  }

  componentDidMount() {
    this.setState({
      in: true
    });
  }

  render() {
    const day = this.props.data;

    return (
      <div style={[
        styles.base,
        day.isInMonthRange ? styles.thisMonth : styles.otherMonth,
        this.state.in && styles.in
      ]}>
        <span>{day.moment.format('D')}</span>
        <ul>{day.items.map(item =>
          <li key={item.date+item.time}>{item.title}</li>
        )}</ul>
      </div>
    );
  }
}
