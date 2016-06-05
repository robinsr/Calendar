import AltContainer from 'alt-container';
import React from 'react';
import moment from 'moment';
import getDays from '../libs/days';
import AppointmentActions from '../actions/AppointmentActions';
import AppointmentStore from '../stores/AppointmentStore';
import { Link } from 'react-router';
import Days from './Days.jsx';

export default class App extends React.Component {
  constructor ( props ) {
    super( props );
    this.setNow(this.props.params);
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

  componentWillReceiveProps(nextProps) {
    this.setNow(nextProps.params)
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.appointments)
    });
  }

  setNow = params => {
    let {year, month} = params;
    this.now = moment().year(year).month(--month).day(15);
  }

  storeChanged = (state) => {
    this.appointments = state.appointments;
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.appointments)
    });
  }

  render () {
    const forward = this.now.clone().add(1, 'month').format('/YYYY/M');
    const backward = this.now.clone().subtract(1, 'month').format('/YYYY/M');
    return (
      <div className="aspect-content">
        <div id="controls">
          <Link className="item" to={backward}>Backward one month</Link>
          <span className="item" >{this.state.monthName}, {this.state.yearName}</span>
          <Link className="item" to={forward}>Forward one month</Link>
        </div>
        <Days days={this.state.days}/>
      </div>
      );
  }
}