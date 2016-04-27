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

export function $delegate(target, selector, event, handler) {
  //TODO if needed
};