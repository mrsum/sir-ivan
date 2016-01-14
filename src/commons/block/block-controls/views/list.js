'use strict';

// Depends
const Mn = require('backbone.marionette');
const ItemView = require('./item');

/**
 * Controls list collection view
 * @return {[type]}         [description]
 */
module.exports = Mn.CollectionView.extend({
  childView: ItemView,
  initialize: function(params) {
    this.collection = params.collection;
    this.childViewOptions = {
      parent: params.parent
    };
  }
});
