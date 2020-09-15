'use strict';

// this is the conversion script to 
// convert the themes in alacritty-themes repo
// from yaml to js
const yaml = require('yaml');

const fs = require('fs');
const path = require('path');

console.log('Convert yml to js');

//const folder = path.resolve('../alacritty-themes/themes'); 
const folder = process.argv[2] || ".";
//console.log(folder);

function convertYaml(folder) {
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
}

function convertJSON() {

  console.log('Convert json to js');

  const base16 = path.resolve('../terminal.sexy/dist/schemes/base16'); 
  const collection = path.resolve('../terminal.sexy/dist/schemes/collection'); 
  const xcolors = path.resolve('../terminal.sexy/dist/schemes/xcolors.net'); 
  const folders = [base16, collection, xcolors];
  //console.log(folder);

  folders.forEach(folder => {
    fs.readdir(folder, (err,files) => {
      if(err) throw err;
      console.log(files);
      files.forEach(f => {
        const data = fs.readFileSync(`${folder}/${f}`, 'utf8');
        const json = JSON.parse(data);
        const newJson = {
          colors: {
            name: json.name,
            author: json.author,
            primary: {
              background: json.background,
              foreground: json.foreground,
            },
            cursor: {
              text: json.background,
              cursor: json.foreground,
            },
            normal: {
              black: json.color[0],
              red: json.color[1],
              green: json.color[2],
              yellow: json.color[3],
              blue: json.color[4],
              magenta: json.color[5],
              cyan: json.color[6],
              white: json.color[7],
            },
            bright: {
              black: json.color[8],
              red: json.color[9],
              green: json.color[10],
              yellow: json.color[11],
              blue: json.color[12],
              magenta: json.color[13],
              cyan: json.color[14],
              white: json.color[15],
            }

          }
        };

        const output = `module.exports = ${JSON.stringify(newJson, null, 2)}`;
        const _baseName = path.basename(f, '.json');
        const fileName = _baseName[0].toUpperCase() + _baseName.slice(1) + '.js';
        const jsFile = 'themes/' + fileName;
        if(!fs.existsSync(jsFile)) {
          fs.writeFile(jsFile, output, (err, data) => {
            if(err) throw err;
            console.log(`${jsFile} written successfully.`);
          });
        }
      });

    });
  });
}

convertJSON();
