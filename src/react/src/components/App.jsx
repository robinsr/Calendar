import React from 'react';
import moment from 'moment';
import getDays from '../libs/days';
import AppointmentActions from '../actions/AppointmentActions';
import AppointmentStore from '../stores/AppointmentStore';
import { Link } from 'react-router';
import Days from './Days.jsx';
import Fancybox from './Fancybox.jsx'

export default class App extends React.Component {
  constructor ( props ) {
    super( props );
    let {year, month} = this.props.params;
    const now = moment().year(year).month(parseInt(month, 10) - 1).date(15);
    this.state = {
      now: now,
      days: getDays(now, []),
      selectedAppt: null
    };
    AppointmentActions.setDate(this.props.params);
    AppointmentActions.setSelected(this.props.location.query.detail);
  }

  componentDidMount() {
    AppointmentStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    AppointmentStore.unlisten(this.storeChanged);
  }

  componentWillReceiveProps(nextProps) {
    AppointmentActions.setDate(nextProps.params);
    AppointmentActions.setSelected(nextProps.location.query.detail);
  }

  storeChanged = state => {
    let {year, month, appointments, selectedAppt} = state;
    const now = moment().year(year).month(parseInt(month, 10) - 1).date(15);
    this.setState({
      now,
      selectedAppt,
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
        <Fancybox selected={this.state.selectedAppt} />
      </div>
      );
  }
}