/**
 * Keeps track of items array, filters for a specific date range
 */

import moment from 'moment';
import uuid from 'node-uuid';
import { EventEmitter } from './util';

export default class Model extends EventEmitter {
  constructor(service) {
    super();

    this.now = moment().day(15);
    this.items = [];

    service.getItems().then(items => {
      this.items = items.map(item => Object.assign(item, {id: uuid.v4()}));
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

  getDays() {
    let days = [];
    let month = moment( this.now ).month();
    let calendarStart = moment( this.now ).startOf( 'month' ).startOf( 'week' ).startOf('day');
    let calendarEnd = moment( this.now ).endOf( 'month' ).endOf( 'week' ).endOf('day');
    let monthStart = moment( this.now ).startOf( 'month' ).toISOString();
    let monthEnd = moment( this.now ).endOf( 'month' ).toISOString();

    // number of days between calendarStart and calendarEnd
    // There is a bug when DST ends (in november). That range is one hour
    // longer, and so moment adds one more day in its asDays() method
    let tRange = calendarEnd.valueOf() - calendarStart.valueOf();
    let daysInView = Math.floor(moment.duration( tRange ).asDays());


    // Get an array of calendar items for this date range ( reduces
    // the number of items we will need to iterate over later )
    let items = this.items.filter( item => {
      return moment( item.date ).isBetween( calendarStart, calendarEnd );
    });

    for (let i = 0; i <= daysInView; i++) {
      
      // Get a moment object for this day
      let dayMoment = moment( calendarStart ).add( i, 'days' );

      // Get an array of calendar items for this day
      let itemsForThisDay = items.filter(item => {
        return moment( item.date ).dayOfYear() == dayMoment.dayOfYear()
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

  toJSON() {
    const days = this.getDays();
    const weekCount = (days.length) / 7;
    const iso = this.getISO();

    return { days, weekCount, iso };
  }
}