'use strict';

const blessed = require('@terminal-junkies/neo-blessed');

module.exports = function(screen) {

  // Import the theme colors
  const colors = require(`../../../themes/${screen.scheme}`);
  // Pass the theme colors to styles
  const theme = require('./styles')(colors.colors);

  const {

    colors: {
      primary: { background, foreground },
      normal: { red, green, blue, yellow, cyan , magenta
      }
    }
  } = theme;


  screen.on('event', function(event, el) {
    var type = (el && el.type) || Object.prototype.toString.call(el).slice(8, -1);
    screen.program.log('emit("%s", {%s})', event, type);
  });


  const list = blessed.list({
    parent: screen,
    align: 'center',
    mouse: true,
    label: ' My list ',
    border: theme.list.border,
    style: theme.list.style,
    width: '25%',
    height: '25%',
    top: '75%+1',
    left: 0,
    tags: true,
    items: [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten'
    ],
    scrollbar: {
      ch: ' ',
      track: {
        bg: yellow
      },
      style: {
        inverse: true
      }
    }
  });

  screen.append(list);
  list.select(0);

  list.items.forEach(function(item) {
    item.setHover(item.getText().trim());
  });

  var item = list.items[1];
  list.removeItem(list.items[1]);
  list.insertItem(1, item.getContent());

  list.on('keypress', function(ch, key) {
    if (key.name === 'up' || key.name === 'k') {
      list.up();
      screen.render();
      return;
    } else if (key.name === 'down' || key.name === 'j') {
      list.down();
      screen.render();
      return;
    }
  });

  list.on('select', function(item, select) {
    list.setLabel(' ' + item.getText() + ' ');
    screen.render();
  });

  var progress = blessed.progressbar({
    border: 'line',
    style: theme.progressbar.style,
    ch: ':',
    //orientation: 'vertical',
    //height: 10,
    //width: 3,
    width: '50%',
    height: 3,
    right: 0,
    bottom: 0,
    filled: 50
  });

  screen.append(progress);

  var lorem = 'Lorem ipsum dolor sit amet, \nconsectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';



  var stext = blessed.scrollabletext({
    //padding: 1,
    mouse: true,
    content: lorem,
    border: 'line',
    style: theme.scrollabletext.style,
    top: '50%+1',
    width: '50%',
    //height: 4,
    height: 6,
    left: 0,
    bottom: 0,
    scrollbar: {
      inverse: true
    }
  });


  screen.append(stext);
  stext.on('keypress', function(ch, key) {
    if (key.name === 'up' || key.name === 'k') {
      stext.scroll(-1);
      screen.render();
      return;
    } else if (key.name === 'down' || key.name === 'j') {
      stext.scroll(1);
      screen.render();
      return;
    }
  });

  //screen.on('element focus', function(cur, old) {
    //if (old.border) old.style.border.fg = foreground;
    //if (cur.border) cur.style.border.fg = green;
    //screen.render();
  //});

  var input = blessed.textbox({
    label: ' My Input ',
    content: '',
    border: 'line',
    style: {
      fg: blue,
      bg: background,
      bar: {
        bg: background,
        fg: blue
      },
      border: {
        fg: foreground,
        bg: background
      }
    },
    width: '30%',
    height: 3,
    left: '50%+1',
    top: '50%+1',
    keys: true,
    vi: true,
    mouse: true
    //inputOnFocus: true
  });

  input.on('submit', function(value) {
    if (value) screen.children[0].setContent(value);
    input.clearInput();
    screen.render();
  });

  screen.append(input);

  var button = blessed.button({
    //content: 'Click me!',
    content: 'Click\nme!',
    shrink: true,
    mouse: true,
    border: 'line',
    style: {
      fg: red,
      bg: blue
    },
    //height: 3,
    right: 4,
    //bottom: 6,
    bottom: 2,
    padding: 0
  });

  button.on('press', function() {
    button.setContent('Clicked!');
    screen.render();
  });

  screen.append(button);

  screen.key('S-s', function() {
    var rand = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    var xi = rand(0, screen.cols - (stext.width - stext.iwidth));
    var xl = xi + stext.width - stext.iwidth;
    var yi = rand(0, screen.rows - (stext.height - stext.iheight));
    var yl = yi + stext.height - stext.iheight;
    stext.wrap = false;
    stext.setContent(screen.screenshot(xi, xl, yi, xl));
    screen.render();
  });

  screen.on('keypress', function(ch, key) {
    if (key.name === 'tab') {
      return key.shift
        ? screen.focusPrevious()
        : screen.focusNext();
    }
    if (key.name === 'escape' || key.name === 'q') {
      return process.exit(0);
    }
  });

  screen.key('C-z', function() {
    screen.sigtstp();
  });


  list.focus();
  screen.render();

};
