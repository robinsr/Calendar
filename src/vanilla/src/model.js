/**
 * Keeps track of items array, filters for a specific date range
 */

import moment from 'moment';

export default class Model {
  constructor(service) {
    this.now = moment();
    this.items = [];

    service.getItems().then(items => {
      this.items = items;
    })
  }

  moveAppointment(key, date) {

  }

  incrementMonth() {
    this.now.add(1, 'month');
  }

  decrementMonth() {
    this.now.subtract(1, 'month')
  }

  setDate(month, year) {

  }

  setItems(items) {
    this.items = items;
  }

  getDays() {

  }
}