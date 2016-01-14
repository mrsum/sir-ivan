'use strict';

// Depends
const Bb = require('backbone');
const Mn = require('backbone.marionette');
const BlockErrors = require('./block-errors/');
const BlockControls = require('./block-controls/');

/**
 * Block base layout
 * @return {[type]}         [description]
 */
module.exports = Mn.LayoutView.extend({
  // model for some events and other features
  buffer: new Bb.Model,
  // current classname
  className: 'st-block__container-inner',
  // template
  template: require('../../templates/commons/block/layout.jade'),
  regions: {
    errorsRegion: '.st-block-inner__errors',
    contentRegion: '.st-block-inner__content',
    controlsRegion: '.st-block-inner__controls'
  },

  initialize: function(params) {
    this.attributes = {
      'data-position': this.model.get('position')
    };

    this.config = params.config;
    this.widgets = params.widgets;

    // on position update -> update data attr
    this.model.on('change:position', model => {
      this.updateDataPosition(model);
    }, this);

    // add default actions for every blocks
    this.actions = new Bb.Collection([{ key: 'move' }, { key: 'bin' }]);

    // look up to actions trigger
    this.model.on('block:controls:click', model => {
      switch (model.get('key')) {
        case 'bin': this.acceptBlockDelete(); break;
        case 'yes':
          let collection = this.model.collection;
          this.model.collection.remove(this.model);
          collection.trigger('collection:positions:recalculate');
          break;
        case 'no':  this.actions.reset(this.history); break;
        default: break;
      }
    }, this);
  },

  onRender: function() {
    // errors container
    this.errorsRegion.show(
      new BlockErrors({
        model: this.model,
        buffer: this.buffer,
        config: this.config
      })
    );

    // get current block type
    let type    = this.model.get('slug') || this.model.get('type');

    // lets find into widgets registry
    let Widget  = this.widgets.findWhere({ type: type });
    let WidgetEntity = Widget.get('entity');

    // apend widget to region
    this.contentRegion.show(
      new WidgetEntity({
        model: this.model,
        buffer: this.buffer,
        config: this.config,
        actions: this.actions,
        params: Widget.get('params') || {}
      })
    );

    // controls
    this.controlsRegion.show(
      new BlockControls({
        parent: this.model,
        actions: this.actions
      })
    );
  },

  /**
   * Update data-position attribute
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  updateDataPosition: function(model) {
    this.el
      .getElementsByClassName('add-block')[0]
        .setAttribute('data-position', model.get('position'));
  },

  /**
   * Accept block Delete
   * @return {[type]} [description]
   */
  acceptBlockDelete: function() {
    this.history = this.actions.toJSON();
    this.actions.reset([
      { key: 'yes' }, { key: 'no' }
    ]);
  }
});
