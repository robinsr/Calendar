/**
 * Links model and view/template, as well as url routing
 */

export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  setView(hash) {
    console.log(hash)
  }

  onDrop(e) {
    const key = e.dataTransfer.getData('calendar');
    const day = e.data.iso;

    this.model.moveAppointment(key, day);
    this.view.render
  }

  onDrag(e) {
    e.dataTransfer.setData('calendar', e.target.data.key);
  }

  onItemClick() {

  }

  onIncClick(e) {
    e.preventDefault();
    this.model.incrementMonth();
    this.view.render();
  }

  onDecClick(e) {
    e.preventDefault();
    this.model.decrementMonth();
    this.view.render();
  }
}