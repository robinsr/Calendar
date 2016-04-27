/**
 * Handles dom events and rendering
 */

import { qs } from './util';
import {  calendar } from './template';

export default class View {
    constructor() {
        this._elem = qs('#target');
    }

    /**
     * Attaches a handler to a view event
     * 
     * @param  {string} ev      event name
     * @param  {func} handler function to bind
     * @return {null}
     */
    bind(ev, handler) {

    }

    render() {

      this._elem.innerHTML = calendar({
        iso: '2016-04-27T21:24:59.065Z',
        days:[{
          iso: '2016-04-27T21:24:59.065Z',
          appointments: [{
            title: 'Some appointment1',
          }, {
            title: 'Some other appointment'
          }]
        }]
      });
    }
};