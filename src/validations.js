const fs = require('fs');
const path = require('path');

const expRegMarkdown = /.\.(m|M(?:d|D?markdown)?)|text$/g;


// Función que evalua si la ruta ingresada es absoluta.
const isPathAbsolute = (routerArg) => {
  if (path.isAbsolute(routerArg)) {
    return routerArg;
  }
  return path.resolve(routerArg);
};


// Función que lee la ruta y valida si es Archivo/Carpeta
// y recorre sus archivos y filtra archivos .md
const readPath = (routerArg) => {
  const arrayFile = [];
  if (fs.statSync(routerArg).isDirectory()) {
    const listFile = fs.readdirSync(routerArg);
    listFile.forEach((file) => {
      const newPath = path.join(routerArg, file);
      const newRoute = fs.statSync(newPath);
      if (newRoute.isFile() && expRegMarkdown.test(file)) { // eliminar y poner la recursividad
        arrayFile.push(newPath);
      } else { //
        readPath(newPath); // -------
      } //---------------
    });
  } else if (fs.statSync(routerArg).isFile() && expRegMarkdown.test(path.basename(routerArg))) {
    arrayFile.push(routerArg);
  }
  const pathFileMd = arrayFile.toString();
  return pathFileMd;
};


exports.isPathAbsolute = isPathAbsolute;
exports.readPath = readPath;
