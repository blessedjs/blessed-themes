'use strict';

const blessed = require('@terminal-junkies/neo-blessed');

module.exports = function(screen) {
  // Import the theme colors
  const colors = require(`../../../themes/${screen.scheme}`);
  // Pass the theme colors to styles
  const boxThemes = require('./styles')(colors.colors);
 
  const box = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width:'25%',
    height:'25%',
    label: 'Box',
    style: boxThemes.box.style,
    border: boxThemes.box.border,
    content: 'This is a box content',
  });

  const redBox = blessed.box({
    parent: screen,
    top: 0,
    left: '25%+1',
    width:'25%',
    height:'25%',
    label: 'Box',
    style: boxThemes.redBox.style,
    border: boxThemes.redBox.border,
    content: 'This is a box content',
  });

  const greenBox = blessed.box({
    parent: screen,
    top: 0,
    left: '50%+1',
    width:'25%',
    height:'25%',
    label: 'Box',
    style: boxThemes.greenBox.style,
    border: boxThemes.greenBox.border,
    content: 'This is a box content',
  });

  const blueBox = blessed.box({
    parent: screen,
    top: 0,
    left: '75%+1',
    width:'25%',
    height:'25%',
    label: 'Box',
    style: boxThemes.blueBox.style,
    border: boxThemes.blueBox.border,
    content: 'This is a box content',
  });

  const yellowBox = blessed.box({
    parent: screen,
    top: '25%+1',
    left: '0',
    width:'25%',
    height:'25%',
    label: 'Box',
    style: boxThemes.yellowBox.style,
    border: boxThemes.yellowBox.border,
    content: 'This is a box content',
  });

  const cyanBox = blessed.box({
    parent: screen,
    top: '25%+1',
    left: '25%+1',
    width:'25%',
    height:'25%',
    label: 'Box',
    style: boxThemes.cyanBox.style,
    border: boxThemes.cyanBox.border,
    content: 'This is a box content',
  });

  const magentaBox = blessed.box({
    parent: screen,
    top: '25%+1',
    left: '50%+1',
    width:'25%',
    height:'25%',
    label: 'Box',
    style: boxThemes.magentaBox.style,
    border: boxThemes.magentaBox.border,
    content: 'This is a box content',
  });

  screen.append(box);

  screen.render();

};
