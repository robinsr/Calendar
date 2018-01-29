'use strict';

const ko = require('knockout');

ko.component.register('day', {
  viewmodel() {
    this.msg = 'I am a day';
  },

  template: `<p data-bind="text: msg"></p>`
});