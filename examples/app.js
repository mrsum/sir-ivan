'use strict';

// Depends
const Sir = require('_sir');
const WidgetText = require('_sir/widgets/text/');

require('./vendors/material-icons/css/material-design-iconic-font.css');

// create editor instance
let sir = new Sir({
  el: document.getElementById('sir-ivan-container'),
  language: 'ru',
  convertFromMarkdown: true,
  convertToMarkdown: true
});

// add widgets
sir.Widgets.add(
  { type: 'text', text: 'Text', icon: 'zmdi zmdi-format-color-text', entity: WidgetText }
);

// add block #1
sir.Storage.add({
  type: 'text',
  body: 'An h1 header\n============\nParagraphs are separated by a blank line. 2nd paragraph.\n*Italic*, **bold**, and `monospace`.\nItemized lists look like: * this one * that one * the other one Note that\n--- not considering the asterisk --- \nthe actual text content starts at 4-columns in.'
});

// add block #2
sir.Storage.add({
  type: 'text',
  body: '# Lorem Ipsum\n\n> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"'
});

// add block #1
sir.Storage.on('change', model => console.log(model.toJSON()), this);
