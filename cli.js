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
  } else if (route !== '--help' || route !== 'md-links') {
    console.log('Ruta ingresada no existe. \nIngrese comando --help');
  }
};


if (directory && args.includes('--stats') && args.includes('--validate')) {
  let pathValid = pathCheck(directory);
  options.stats = true;
  options.validate = true;
  index.mdLinks(pathValid, options)
    .then(result => {    
      console.log(`Total: ${result.total} \nUnique: ${result.unique} \nBroken: ${result.broken} `);
    });
} else if (directory && args[0] === undefined) {
  let pathValid = pathCheck(directory);
  optionsLinks.readLinks(pathValid)
    .then(result => {
      result.forEach(element => {
        console.log(`${element.file}  ${element.href}  ${element.text}`);
      });
    });
} else if (directory && args[0] === '--validate') {
  let pathValid = pathCheck(directory);
  options.validate = true;
  index.mdLinks(pathValid, options)
    .then(result => {
      result.forEach(element => {
        console.log(`${element.file}  ${element.href}  ${element.text}  ${element.status}`);
      });
    });
} else if (directory && args[0] === '--stats') {
  let pathValid = pathCheck(directory);
  options.stats = true;
  index.mdLinks(pathValid, options)
    .then(result => {      
      console.log(`Total: ${result.total} \nUnique: ${result.unique}`);
    });
}


