/**
 * Handles dom events and rendering
 */

import { $delegate, qs } from './util';
import { calendar } from './template';
import { EventEmitter } from './util';

export default class View extends EventEmitter {
    constructor() {
      super();
      this._elem = qs('#target');
      this.delegateEvents();
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

    delegateEvents() {
      let elem = qs('#target');
      $delegate(elem, '.item', 'click', e => {
        // todo show modal
      });

      $delegate(elem, '.item', 'dragstart', e => {
        this.trigger('dragstart', e);
      });

      $delegate(elem, '.day', 'dragover', e => {
        e.preventDefault();
      } );

      $delegate(elem, '.day', 'dragenter', e => {
        e.preventDefault();
      } );

      $delegate(elem, '.day', 'drop', (e) => {
        this.trigger('drop', e);
      });
    }

    render(data) {
      this._elem.innerHTML = calendar(data);
    }
};