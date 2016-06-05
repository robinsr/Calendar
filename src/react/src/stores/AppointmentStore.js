import momemt from 'moment';
import alt from '../libs/alt';
import AppointmentActions from '../actions/AppointmentActions';
import AppointmentSource from '../sources/AppointmentSource';
import update from 'react-addons-update';

class AppointmentStore {
  constructor() {
    this.appointments = [];
    this.bindActions(AppointmentActions);
    this.registerAsync(AppointmentSource);
  }

  receivedResults(appointments) {
    this.setState({appointments})
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
}

export default alt.createStore(AppointmentStore, 'AppointmentStore');