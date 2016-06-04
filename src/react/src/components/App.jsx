import AltContainer from 'alt-container';
import React from 'react';
import moment from 'moment';
import getDays from '../libs/days';
import AppointmentActions from '../actions/AppointmentActions';
import AppointmentStore from '../stores/AppointmentStore';
import Days from './Days.jsx';

export default class App extends React.Component {
  constructor ( props ) {
    super( props );

    this.now = moment().startOf('month');
    this.appointments = [];
    this.state = {
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, [])
    };

    AppointmentStore.getAll();
  }

  componentDidMount() {
    AppointmentStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    AppointmentStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    this.appointments = state.appointments;
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.appointments)
    });
  }

  incrementMonth = () => {
    this.now.add(1, 'month');
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.appointments)
    });

  }

  decrementMonth = () => {
    this.now.subtract(1, 'month');
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.appointments)
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