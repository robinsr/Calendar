/**
 * Handles dom events and rendering
 */

import { $delegate, qs } from './util';
import { about, calendar, details } from './template';
import { EventEmitter } from './util';

export default class View extends EventEmitter {
    constructor() {
      super();
      this._tar = qs('#target');
      this._body = qs('body');
      this._modalOverlay = qs('#modal-overlay');
      this._modalContent = qs('#modal-content', this._modalOverlay)
      this.delegateEvents();
    }

    delegateEvents() {

      const {_tar, _modalOverlay, _body} = this;

      $delegate(_tar, '.item', 'click', e => {
        this.trigger('itemClick', e);
      });

      $delegate(_tar, '.item', 'dragstart', e => {
        this.trigger('itemDrag', e);
      });

      $delegate(_tar, '.day', 'dragover', e => {
        e.preventDefault();
      } );

      $delegate(_tar, '.day', 'dragenter', e => {
        e.preventDefault();
      } );

      $delegate(_tar, '.day', 'drop', e => {
        this.trigger('itemDrop', e);
      });

      $delegate(_modalOverlay, '.close', 'click', e => {
        e.preventDefault();
        this.hideItemModal();
      });

      $delegate(_body, '#aboutButton', 'click', e => {
        this.showAboutModal(); 
      })
    }

    showAboutModal() {
      this._modalContent.innerHTML = about();
      this._modalOverlay.classList.add('in');
    }

    showItemModal(data) {
      this._modalContent.innerHTML = details(data);
      this._modalOverlay.classList.add('in');
    }

    hideItemModal() {
      this._modalOverlay.classList.remove('in');
    }

    render(data) {
      this._tar.innerHTML = calendar(data);
    }
};