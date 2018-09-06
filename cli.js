#!/usr/bin/env node
const fs = require('fs');
const index = require('./src/index.js');
const validations = require('./src/validations.js');
const optionsLinks = require('./src/optionsLinks.js');


const [, , ...args] = process.argv;
const directory = args.shift();
const options = {
  validate: false,
  stats: false,
};


// Función que indica las instrucciones de uso de la librería.
const instructions = () => {
  console.log('Uso: \n   md-links <path> [options]');
  console.log('Opciones: \n   [--validate]');
  console.log('   [--stats]');
  console.log('   [--validate --stats]');
  console.log('   [--help]');
};


const pathCheck = (route) => {
  if (fs.existsSync(route)) {
    const pathAbsolute = validations.isPathAbsolute(route);
    const pathFileMd = validations.readPath(pathAbsolute);
    return pathFileMd;
  } else if (route === '--help') {
    instructions();
  } else {
    console.log('Ruta ingresada no existe. \nIngrese comando --help');
  }
};

let pathValid = pathCheck(directory);


if (pathValid && args.includes('--stats') && args.includes('--validate')) {
  options.stats = true;
  options.validate = true;
  index.mdLinks(pathValid, options)
    .then(result => {      
      console.log(`Total: ${result.total} \nUnique: ${result.unique} \nBroken: ${result.broken} `);
    });
} else if (pathValid && args[0] === undefined) {
  optionsLinks.readLinks(pathValid)
    .then(result => {
      result.forEach(element => {
        console.log(`${element.file}  ${element.href}  ${element.text}`);
      });
    });
} else if (pathValid && args[0] === '--validate') {
  options.validate = true;
  index.mdLinks(pathValid, options)
    .then(result => {
      result.forEach(element => {
        console.log(`${element.file}  ${element.href}  ${element.text}  ${element.status}`);
      });
    });
} else if (pathValid && args[0] === '--stats') {
  options.stats = true;
  index.mdLinks(pathValid, options)
    .then(result => {      
      console.log(`Total: ${result.total} \nUnique: ${result.unique}`);
    });
}


