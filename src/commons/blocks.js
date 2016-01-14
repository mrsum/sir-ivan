'use strict';

// Depends
const Mn = require('backbone.marionette');
const BlockView = require('./block/');

// add behav
require('./behaviours/sortable');

/**
 * Editor.Blocks collection view
 * @return {[type]}         [description]
 */
module.exports = Mn.CollectionView.extend({
  behaviors: {
    Sortable: {
      sort: true,
      scroll: true,
      animation: 250,

      behaviorClass: Mn.SortableBehavior,
      handle: '.st-block-btn-move',
      ghostClass: 'st-block__sortable-ghost',
      chosenClass: 'st-block__sortable-chosen',
      dataIdAttr: 'data-model-cid'
    }
  },
  className: 'st-block__container',
  initialize: function(params) {
    this.collection = params.collection;
    this.childView  = BlockView;
    this.childViewOptions = {
      config: params.config,
      widgets: params.widgets
    };

    this.listenTo(this.collection, 'collection:positions:recalculate', () => {
      this.collection.recalculate(this.el);
    });
  }
});
