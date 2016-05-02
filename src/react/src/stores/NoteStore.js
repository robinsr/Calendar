import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];

    this.exportPublicMethods({
      getNotesById: this.getNotesById.bind(this)
    });
  }

  create(note) {
    const notes = this.notes;

    note.id = uuid.v4();

    this.setState({
      notes: notes.concat(note)
    });

    return note;
  }

  update(updatedNote) {
    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        return Object.assign({}, note, updatedNote);
      }
      return note;
    });

    this.setState({notes});
  }

  delete(id) {
    this.setState({
      notes: this.notes.filter(note => note.id !== id) 
    });
  }

  getNotesById(ids) {
    return (ids || [])
      .map(id => this.notes.filter(note => note.id === id))
      .filter(a => a.length)
      .map(a => a[0]);
  }

  deleteNotesById(ids) {

    this.notes.filter(note => {
      const match = ids.filter(id => {
        return note.id !== id;
      } )

      console.log(match)
      return match.length;
    } );


    console.log(this.notes)
    for (var i = 0; i < ids.length; i++) {
      this.delete(ids[i]);
    }
  }
}

export default alt.createStore(NoteStore, 'NoteStore');