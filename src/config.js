module.exports = {
  version: '2.0.0',
  language: 'ru',
  widgets: {
    text: {
      icon: 'zmdi zmdi-text',
      editor: {
        mode: 'gfm',
        tabSize: '2',
        lineWrapping: true,
        indentWithTabs: true,
        addPanel: true
      }
    }
  },
  defaults: {
    blockLimit: 0,
    blockTypeLimits: {},
    required: [],
    uploader: {
      url: '/core/assets',
      type: ''
    },
    uploadUrl: '/core/assets',
    convertToMarkdown: false,
    convertFromMarkdown: false,
    formatBar: {
      commands: [
        {
          name: 'Bold',
          title: 'bold',
          icon: 'zmdi zmdi-format-bold',
          start: '**',
          end: '**'
        },
        {
          name: 'Italic',
          title: 'italic',
          icon: 'zmdi zmdi-format-italic',
          start: '_',
          end: '_'
        },
        {
          name: 'Underline',
          title: 'underline',
          icon: 'zmdi zmdi-format-underlined',
          start: '<u>',
          end: '</u>'
        },
        {
          name: 'Strike',
          title: 'underline',
          icon: 'zmdi zmdi-format-strikethrough-s',
          start: '~~',
          end: '~~'
        },
        {
          name: 'insertOrderedList',
          title: 'ordered list',
          icon: 'zmdi zmdi-format-list-numbered',
          start: '\n\n1. ',
          end: '\n\n'
        },

        {
          name: 'insertUnorderedList',
          title: 'unordered list',
          icon: 'zmdi zmdi-format-list-bulleted',
          start: '\n\n- ',
          end: '\n\n'
        },
        {
          name: 'Link',
          title: 'link',
          icon: 'zmdi zmdi-link',
          start: '[',
          end: '](http://example.com)'
        }
      ]
    }
  }
};
