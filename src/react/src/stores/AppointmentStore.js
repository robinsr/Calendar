import momemt from 'moment';
import alt from '../libs/alt';
import AppointmentActions from '../actions/AppointmentActions';
import AppointmentSource from '../sources/AppointmentSource';

class AppointmentStore {
  constructor() {
    this.appointments = [];
    this.results = {};
    this.year;
    this.month;
    this.selectedAppt;
    this.bindActions(AppointmentActions);
    this.registerAsync(AppointmentSource);
  }

  receivedResults(appointments, args) {
    let { results, year, month } = this;
    this.setState({
      appointments,
      results: Object.assign(results, {[`${year}/${month}`]: appointments })
    });
  }

  fetchingResultsFailed(err) {
    alert(err);
  }

  updateSuccess() {
    this.emitChange();
  }

  updateError(err) {
    alert(err);
  }

  move({sourceId, date}) {
    const appointments = this.appointments;
    const sourceAppt = appointments.find(appt => appt.id === sourceId);
    sourceAppt.date = date;
    this.getInstance().update(sourceAppt);
  }

  setDate({year, month}) {
    const newState = {year, month};
    const key = `${year}/${month}`;

    if (this.results[key]) {
      return this.setState(Object.assign(newState, {
        appointments: this.results[key]
      }));
    } else {
      this.setState(newState);
      this.getInstance().get({year, month});
    } 
  }

  setSelected(sel) {
    const selectedAppt = !sel ? null : this.appointments.find(appt => appt.id === sel); 
    this.setState({ selectedAppt });
  }
}

export default alt.createStore(AppointmentStore, 'AppointmentStore');