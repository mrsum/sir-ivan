'use strict';

// Depends
const Mn = require('backbone.marionette');
const ActionListView = require('./views/list');

module.exports = Mn.LayoutView.extend({
  className: 'st-block-inner__controls--icons',
  regions: {
    actionBtnsRegion: '.st-block-inner__controls--icons-container'
  },
  template: require('./templates/layout.jade'),

  /**
   * Inialize
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  initialize: function(params) {
    this.actions = params.actions;
    this.parent  = params.parent;
  },

  /**
   * On Render
   * @return {[type]} [description]
   */
  onRender: function() {
    this.actionBtnsRegion.show(
      new ActionListView({
        parent: this.parent,
        collection: this.actions
      })
    );
  }
});
