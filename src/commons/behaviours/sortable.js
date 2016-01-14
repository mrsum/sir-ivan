'use strict';

// Depends
const _  = require('underscore');
const Mn = require('backbone.marionette');
const Sortable = require('sortablejs');

/**
 * Marionette Sortable behaviour
 * @return  {[type]}
 */
Mn.SortableBehavior = Mn.Behavior.extend({

  /**
   * On render
   * @return {[type]} [description]
   */
  onRender: function() {
    let options = _.clone(this.options);
    // remove behav otions
    delete options.behaviorClass;
    // set options
    options.onUpdate = (e) => this.onSortUpdate(e);
    // start sortable observer
    Sortable.create(this.el, options);
  },

  /**
   * [onSortUpdate description]
   * @param  {object} e Sortable event
   * @return {object}   [description]
   */
  onSortUpdate: function(e) {
    this.view.collection.recalculate(e.from);
  },

  /**
   * On add childview
   * @param  {Mn.View} view Current Mn.View
   * @return {object}
   */
  onAddChild: function(view) {
    view.el.setAttribute('data-model-cid', view.model.cid);
  }

});
