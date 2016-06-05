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
    let {year, month} = this.props.params;
    const now = moment().year(year).month(--month).day(15);
    this.state = {
      now: now,
      days: getDays(now, [])
    };
    AppointmentActions.setDate(this.props.params);
  }

  componentDidMount() {
    AppointmentStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    AppointmentStore.unlisten(this.storeChanged);
  }

  componentWillReceiveProps(nextProps) {
    AppointmentActions.setDate(nextProps.params)
  }

  storeChanged = state => {
    let {year, month, appointments} = state;
    const now = moment().year(year).month(--month).day(15);
    this.setState({
      now,
      days: getDays(now, appointments)
    });
  }

  render () {
    const forward = this.state.now.clone().add(1, 'month').format('/YYYY/M');
    const backward = this.state.now.clone().subtract(1, 'month').format('/YYYY/M');
    return (
      <div className="aspect-content">
        <div id="controls">
          <Link className="item" to={backward}>Backward one month</Link>
          <span className="item" >{this.state.now.format('MMMM')}, {this.state.now.format('YYYY')}</span>
          <Link className="item" to={forward}>Forward one month</Link>
        </div>
        <Days days={this.state.days}/>
      </div>
      );
  }
}