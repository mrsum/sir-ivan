'use strict';

// Depends
const Bb = require('backbone');
const Mn = require('backbone.marionette');

module.exports = Mn.CollectionView.extend({
  timer: false,
  template: false,
  className: 'st-format-bar',
  childView: Mn.ItemView.extend({
    tagName: 'a',
    className: 'st-format-btn',
    template: false,
    events: {
      click: 'sendCommand'
    },
    initialize: function(params) {
      this.parent = params.parent;
    },
    render: function() {
      this.$el.addClass(this.model.get('icon') || 'st-format-bar__icon');
      this.$el.attr('title', this.model.get('title') || 'title');
      return this;
    },
    sendCommand: function() {
      this.model.trigger('formatbar:command', this.model);
    }
  }),
  initialize: function(params) {
    this.config = params.config;
    this.parent = params.parent;
    this.collection = new Bb.Collection(params.config.defaults.formatBar.commands);
    this.childViewOptions = {
      parent: this.parent
    };

    // proxy command
    this.collection.on('formatbar:command', model => {
      this.parent.trigger('formatbar:command', model);
    });
  },

  /**
   * FormatBar:show
   * @param  {[type]} coords [description]
   * @return {[type]}        [description]
   */
  show: function(coords) {
    // calculate x point
    var top = coords.start.bottom;
    var left = coords.start.left + ((coords.end.left - coords.start.left) / 2 );

    clearInterval(this.timer);
    this.timer = setTimeout(() => { this.hide(); }, 5000);

    // small correction for left coord
    left = left - (this.$el.width() / 2 ) + 30;

    // append styles for format bar
    this.$el.css({ top: top, left: left });
    this.$el.addClass('st-format-bar--is-ready');
  },

  /**
   * FormatBar:hide
   * @return {[type]} [description]
   */
  hide: function() {
    this.$el.removeClass('st-format-bar--is-ready');
  }
});
