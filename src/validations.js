const fs = require('fs');
const path = require('path');

// Función que evalua si la ruta ingresada es absoluta.
const isPathAbsolute = (routerArg) => {
  if (path.isAbsolute(routerArg)) {
    return routerArg;
  }
  return path.resolve(routerArg);
};

// Función que lee la ruta y valida si es Archivo/Carpeta
// y recorre sus archivos y filtra archivos .md
const readPath = (routerArg, arrayFile_) => {
  arrayFile_ = arrayFile_ || [];
  const expRegMarkdown = /.\.(m|M(?:d|D?markdown)?)|text$/g;
  const route = fs.statSync(routerArg);
  if (route.isDirectory()) {
      const listFile = fs.readdirSync(routerArg);  
      listFile.forEach((file) => {
       const newPath = path.join(routerArg, file);         
       readPath(newPath, arrayFile_);
      });
  } else if (route.isFile() && expRegMarkdown.test(path.basename(routerArg))) {
      arrayFile_.push(routerArg);
  }
  return arrayFile_;
};

exports.isPathAbsolute = isPathAbsolute;
exports.readPath = readPath;
