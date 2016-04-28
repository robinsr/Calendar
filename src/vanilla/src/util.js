/**
 * Utility functions for DOM, bindings, etc
 */

export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
};

export function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
};

export function $on(target, event, handler) {
  target.addEventListener(event, handler);
};

export function $delegate(target, selector, type, handler) {
  function dispatchEvent(event) {
    var targetElement = event.target;
    var potentialElements = qsa(selector, target);
    var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

    if (hasMatch) {
      handler.call(targetElement, event);
    }
  }

  var useCapture = type === 'blur' || type === 'focus';

  $on(target, type, dispatchEvent, useCapture);
};

export class EventEmitter {
  constructor() {
    this._cb = {};
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
      this._cb[ type ].handlers.forEach(handle => handle(data))
    }
  }
}