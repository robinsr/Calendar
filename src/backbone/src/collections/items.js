'use strict';

define(['backbone', 'models/item'], function (backbone, Item) {
  return backbone.Collection.extend({

    model: Item,

    url: '/common/items.json'

  });
});