/**
 * Links model and view/template, as well as url routing
 */

import { $on } from './util';

export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    $on(this.model, 'sync', this.render.bind(this));
    $on(this.model, 'update', this.render.bind(this));
    $on(this.view, 'itemDrag', this.onDrag.bind(this));
    $on(this.view, 'itemDrop', this.onDrop.bind(this));
    $on(this.view, 'itemClick', this.onClick.bind(this));
    $on(this.view, 'setDate', this.setView.bind(this));
  }

  setView(hash) {
    var validURL = /^#\/[\d]{2}\/[\d]{4}$/.test(hash);

    if (validURL) {
      var matches = hash.match(/^#\/([\d]{2})\/([\d]{4})$/);
      var month = parseInt(matches[1], 10) - 1;
      var year = parseInt(matches[2], 10);

      this.model.setDate(month,year);
    }

    this.render();
  }

  render() {
    this.view.render(this.model.toJSON());
  }

  onDrop(e) {
    const key = e.dataTransfer.getData('calendar');
    const day = e.target.dataset.iso;

    this.model.moveAppointment(key, day);
  }

  onDrag(e) {
    e.dataTransfer.setData('calendar', e.target.dataset.key);
  }

  onClick(e) {
    const key = e.target.dataset.key;
    this.view.showItemModal(this.model.getAppt(key));
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