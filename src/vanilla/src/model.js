/**
 * Keeps track of items array, filters for a specific date range
 */

import moment from 'moment';
import uuid from 'uuid-v4';
import { EventEmitter } from './util';

export default class Model extends EventEmitter {
  constructor(service) {
    super();

   this.now= moment().day(15);
    this.items = [];

    service.getItems().then(items => {
      this.items = items.map(item => Object.assign(item, {id: uuid()}));
      this.trigger('sync');
    })
  }

  addEventListener(type, func) {
    if (this._cb[ type ]) {
      this._cb[ type ].handlers.push(func);
    } else {
      this._cb[ type ] = {
        handlers: [ func ]
      }
    }
  }

  trigger(type, data) {
    if (this._cb[ type ]) {
      this._cb[ type ].handlers.forEach(handle => handle())
    }
  }

  moveAppointment(key, date) {
    var appt = this.items.filter(item => item.id === key)[0];
    appt.date = moment(date).format('M/D/YYYY');
    this.trigger('update');
  }

  incrementMonth() {
    this.now.add(1, 'month');
  }

  decrementMonth() {
    this.now.subtract(1, 'month')
  }

  setDate(month, year) {
    this.now.month(month).year(year);
  }

  setItems(items) {
    this.items = items;
  }

  // TODO this function is common to all versions. Refactor to common
  getDays() {
    let days = [];
    let month = moment(this.now).month();

    // because of DST, the number of ms between calendarStart and calendar end
    // will vary by +/- 1 hr. I am truncating the range my setting the start
    // at 3am and the end at 9pm and rounding the number. 
    let calendarStart = moment(this.now).startOf('month').startOf('week').hour(2);
    let calendarEnd = moment(this.now).endOf('month').endOf('week').hour(21);

    // number of days between calendarStart and calendarEnd
    let tRange = calendarEnd.valueOf() - calendarStart.valueOf();
    let daysInView = Math.floor(moment.duration( tRange ).asDays());


    // Get an array of calendar items for this date range (reduces the number 
    // of items we will need to iterate over later). Set the hour of the item
    // to noon so that items will be in range (default is 00:00, too early to 
    // be in range for the first day)
    let items = this.items.filter(item => {
      return moment(item.date).hour(12).isBetween(calendarStart, calendarEnd);
    });

    for (let i = 0; i <= daysInView; i++) {
      
      // Get a moment object for this day
      let dayMoment = moment(calendarStart).add(i, 'days');

      // Get an array of calendar items for this day
      let itemsForThisDay = items.filter(item => {
        return moment(item.date).dayOfYear() == dayMoment.dayOfYear()
      });

      // Create a Day model 
      days.push({
        isInMonthRange: dayMoment.month() === month,
        iso: dayMoment.toISOString(),
        appointments: itemsForThisDay
      });
    };

    return days;
  }

  getISO() {
    return this.now.toISOString();
  }

  getAppt(key) {
    return this.items.filter(item => item.id === key)[0];
  }

  toJSON() {
    const days = this.getDays();
    const weekCount = (days.length) / 7;
    const iso = this.getISO();

    return { days, weekCount, iso };
  }
}