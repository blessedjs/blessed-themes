'use strict';

const fs = require('fs');
const path = require('path');
const blessed = require('@terminal-junkies/neo-blessed');
const contrib = require('blessed-contrib');
const homePage = require('./pages/home');
const boxPage = require('./pages/box');


const prompts = require('prompts');

const files = fs.readdirSync(path.join(__dirname, '../themes'));
const themes = files.map(f =>  {
  const temp = f.replace('.js','');
  return { title : temp, value : temp };
});


prompts({
  type: 'autocomplete',
  name: 'theme',
  message: 'Select a theme',
  choices: themes,
}).then(response => { 

  main(response.theme);
});


function main(scheme) {
  const screen = blessed.screen({
    fullUnicode: true,
    title: 'widget test',
  });

  screen.scheme = scheme;
  // Import the theme colors
  const colors = require(`../themes/${scheme}`);

  const program = blessed.program();

  program.bg(colors.colors.primary.background);
  program.fg(colors.colors.primary.foreground);


  debugger;
  const carousel = new contrib.carousel( [homePage, boxPage]
    , { screen: screen
      , interval: 0 //how often to switch views (set 0 to never swicth automatically)
      , controlKeys: true  //should right and left keyboard arrows control view rotation
    })


  carousel.start();
};
