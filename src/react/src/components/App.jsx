import AltContainer from 'alt-container';
import React from 'react';


import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import Days from './Days.jsx';
import moment from 'moment';
import getDays from '../libs/days';

export default class App extends React.Component {
  constructor ( props ) {
    super( props );

    //this.state = LaneStore.getState();
    this.now = moment().startOf('month');
    this.state = {
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, props.items || [])
    };
  }

  componentDidMount() {
    //LaneStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    //LaneStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    //this.setState(state);
  }

  incrementMonth = () => {
    this.now.add(1, 'month');
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.props.items || [])
    });

  }

  decrementMonth = () => {
    this.now.subtract(1, 'month');
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.props.items || [])
    });
  }

  render () {
    return (
      <div className="aspect-content">
        <div id="controls">
          <a className="item" href="#" onClick={this.decrementMonth}>-</a>
          <a className="item" >{this.state.monthName}, {this.state.yearName}</a>
          <a className="item" href="#" onClick={this.incrementMonth}>+</a>
        </div>
        <Days days={this.state.days}/>
      </div>
      );
  }

  addLane = () => {
    LaneActions.create({name: 'New Lane'});
  };
}