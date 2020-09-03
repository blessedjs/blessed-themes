'use strict';

// this is the conversion script to 
// convert the themes in alacritty-themes repo
// from yaml to js
const yaml = require('yaml');

const fs = require('fs');
const path = require('path');

console.log('Convert yml to js');

const folder = path.resolve('../alacritty-themes/themes'); 
fs.readdir(folder, (err,files) => {
  if(err) throw err;
  console.log(files);
  files.forEach(f => {
    const data = fs.readFileSync(`${folder}/${f}`, 'utf8');
    const js = yaml.parse(data);
    const output = `module.exports = ${JSON.stringify(js, null, 2)}`;
    const jsFile = 'themes/' + path.basename(f, '.yml') + '.js';
    fs.writeFile(jsFile, output, (err, data) => {
      if(err) throw err;
      console.log(`${jsFile} written successfully.`);
    });
  });

});
