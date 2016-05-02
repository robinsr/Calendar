import momemt from 'moment';
import alt from '../libs/alt';
import AppointmentActions from '../actions/AppointmentActions';
import update from 'react-addons-update';

class AppointmentStore {
  constructor() {
    this.bindActions(AppointmentActions);
    this.appointments = [];
  }

  move({sourceId, targetId}) {
    const lanes = this.lanes;
    const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
    const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];
    const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
    const targetNoteIndex = targetLane.notes.indexOf(targetId);

    if ( sourceLane === targetLane ) {
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId]
        ]
      })
    } else {
      sourceLane.notes.splice(sourceNoteIndex, 1);
      targetLane.notes.splice(targetNoteIndex, 0, sourceId);
    }

    this.setState({lanes})
  }  
}

export default alt.createStore(LaneStore, 'LaneStore');