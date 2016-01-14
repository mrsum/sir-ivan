'use strict';

// Depends
const Mn = require('backbone.marionette');
const TypeItem = require('./views/item');

module.exports = Mn.CollectionView.extend({
  childView: TypeItem,
  className: 'st-block-controls st-block-controls--active',
  initialize: function(params) {
    this.collection = params.collection;
  }
});
