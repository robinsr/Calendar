/**
 * Keeps track of items array, filters for a specific date range
 */

import moment from 'moment';
import uuid from 'uuid-v4';
import { EventEmitter } from './util';
import service from './service';

export default class Model extends EventEmitter {
  constructor() {
    super();

    this.now = moment().day(15);
    this.items = [];

    service.getItems().then(items => {
      this.items = items;
      this.trigger('sync');
    })
  }

  moveAppointment(id, date) {
    date = moment(date).format('M/D/YYYY');
    let appt = this.items.find(item => item.id === id);
    let data

    if (appt) {
      appt.date = date;
      data = appt;
    } else {
      data = { id, date };
    }

    service.updateItem(data)
      .then(() => {
        if (appt) {
          this.trigger('update');
        } else {
          this.getItems();
        }
      });
  }

  incrementMonth() {
    this.now.add(1, 'month');
    this.getItems();
  }

  decrementMonth() {
    this.now.subtract(1, 'month');
    this.getItems();
  }

  setDate(month, year) {
    this.now.month(month).year(year);
    this.getItems();
  }

  getItems() {
    service.getMonth(this.now.month(), this.now.year())
      .then(items => {
        this.items = items;
        this.trigger('sync');
      });
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