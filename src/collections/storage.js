'use strict';

// Depends
const _ = require('underscore');
const Bb = require('backbone');

/**
 * Blocks Storage collection
 * @return {[type]}
 */
module.exports = Bb.Collection.extend({

  /**
   * Inialize
   * @return {[type]} [description]
   */
  initialize: function() {
    this.on('add', () => {
      this.updatePosition();
    }, this);


    this.on('add change:position', () => {
      this.sort({ silent: true });
    }, this);
    
    this.on('block:move:content', (params) => {
      this.add({
        type: params.source.get('type'),
        slug: params.source.get('slug'),
        position: params.source.get('position'),
        body: params.text
      });
    });
  },

  /**
   * Comporator and sorting by next field
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  comparator: function(model) {
    return model.get('position');
  },

  /**
   * Prepend new block to started index
   * @param  {[type]} type     [description]
   * @param  {[type]} data     [description]
   * @param  {[type]} position [description]
   * @return {[type]}          [description]
   */
  prependBlock: function(type, data) {
    this.add({
      type: type,
      body: data,
      position: 0
    }, { at: 0 });
  },

  /**
   * Append block
   * @param  {[type]} type     [description]
   * @param  {[type]} data     [description]
   * @param  {[type]} position [description]
   * @return {[type]}          [description]
   */
  appendBlock: function(type, data, position) {
    this.add({
      type: type,
      body: data,
      position: position * 1
    }, { at: position * 1 });
  },

  /**
   * Update block postion
   * @return {[type]} [description]
   */
  updatePosition: function() {
    this.models.filter((model, key) => {
      model.set('position', key + 1);
    });
  },

  /**
   * Recalculate position on add block
   * @return {[type]} [description]
   */
  recalculate: function(parentElement) {
    _.each(parentElement.childNodes, (element, position) => {
      this.get(element.getAttribute('data-model-cid')).set('position', position + 1);
    });
  }

});
