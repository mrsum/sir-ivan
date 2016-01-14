'use strict';

// Depends
const $ = require('jquery');
const Bb = require('backbone');
const Codemirror = require('codemirror');
const StatusBar = require('./views/status-bar');
const FormatBar = require('./views/format-bar');

// markdown to html tool
const marked = require('marked');

// Styles and adhoc
require('codemirror/mode/gfm/gfm.js');
require('codemirror/lib/codemirror.css');

module.exports = Bb.View.extend({
  slug: 'text',
  type: 'Widgets::Widget::Text',
  delayTimer: false,
  className: 'st-widget__text',
  $preview: null,
  initialize: function(params) {
    // define private attributes
    this.model    = params.model;
    this.config   = params.config;
    this.buffer   = params.buffer;
    this.actions  = params.actions;

    // create instances
    this.editor = new Codemirror(this.el, this.config.widgets.text.editor);
    this.editor.getDoc().setValue(this.model.get('body'));
    this.statusBar = new StatusBar();
    this.formatBar = new FormatBar({
      parent: this.model,
      config: this.config
    });

    // temporary hack
    this.model.set('type', this.type);
    this.model.set('slug', this.slug);

    // look up to
    this.editor.on('update', cm => {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        this.model.set('body', cm.getValue());
      }, 1000);
      this.statusBar.updateLineCounts(this.editor.lineCount());
    });

    // if you want to use shift+tab for textblock separation
    this.editor.setOption('extraKeys', {
      'Shift-Tab': function(editor) {
        let cursorPosition = editor.getCursor();
        let textEndPosition = { line: editor.doc.lastLine(), ch: 9999999999999999999999 };
        let text = editor.getRange(cursorPosition, textEndPosition);
        if (text.length > 0) {
          editor.replaceRange('\n', cursorPosition, textEndPosition);
          params.model.trigger('block:move:content', { source: params.model, text: text });
        }
      }
    });

    // cursor activity
    this.editor.on('cursorActivity', (editor) => {
      let pos = editor.getCursor();
      // update cursor activity status
      this.statusBar.updateCursor(pos.line + ':' + pos.ch);

      // user has selected some text
      if (editor.doc.somethingSelected()) {
        let coords = editor.doc.getCursor();
        let selectedText = editor.doc.getSelection();
        let positionStart = editor.cursorCoords(true, 'local');
        let positionEnd = editor.cursorCoords(false, 'local');
        this.formatBar.show({
          start: positionStart,
          end: positionEnd
        });

        // hide formatbar element
      } else this.formatBar.hide();
    });

    // add new controls type
    this.actions.add({ key: 'show' }, {at: 0});

    // look up to click
    this.model.on('block:controls:click', model => {
      if (model.get('key') === 'show') this.previewModeToggle();
    }, this);

    // subscribe to format bar trigger
    this.model.on('formatbar:command', model => this.wrapText(model));

    // append to current view
    this.$el.append(this.statusBar.render().$el);
    this.$el.append(this.formatBar.render().$el);
  },

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render: function() {
    // hack for setValue
    setTimeout(() => { this.editor.refresh(); }, 100);
    return this;
  },

  /**
   * Preview Toggle
   * @return {[type]} [description]
   */
  previewModeToggle: function() {
    // @todo: lets refactoring for nice code style
    if (this.$preview) {
      this.changeBlockLabel(this.slug);
      this.$preview.remove();
      this.$preview = null;
      this.$el.find('.CodeMirror').show();
    } else {
      let html = marked(this.editor.getValue());
      this.$preview = $('<div />', { class: 'st-text-widget-preview' });
      this.$el.parents('.st-block').attr('data-type', 'preview');
      this.$preview.html(html);
      this.$el.append(this.$preview);
      this.$el.find('.CodeMirror').hide();
    }
  },

  /**
   * Change Label Block
   * @param  {[type]} label [description]
   * @return {[type]}       [description]
   */
  changeBlockLabel: function(label) {
    this.$el.parents('.st-block').attr('data-type', label);
  },

  /**
   * Wrap selected text
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  wrapText: function(model) {
    let range = this.getSelectedRange();
    this.toggleBlock(range, { start: model.get('start'), end: model.get('end') });
  },

  /**
   * Get codemirror selected range
   * @return {[type]} [description]
   */
  getSelectedRange: function() {
    return { from: this.editor.getCursor(true), to: this.editor.getCursor(false) };
  },

  /**
   * Block toggling
   * @param  {[type]} range [description]
   * @param  {[type]} rules [description]
   * @return {[type]}       [description]
   */
  toggleBlock: function(range, rules) {
    let text = this.editor.doc.getSelection();
    this.editor.doc.replaceRange(rules.start + text + rules.end, range.from, range.to);
  }
});
