const fs = require('fs');
const path = require('path');


// Función que convierte ruta absoluta a relativa y
// se resuelve como relativa desde el currentWorkingDirectoy.
const convertToAbsolute = (routerArg) => {
  return path.resolve(routerArg)
}


// Función que evalua si la ruta ingresada es absoluta.
const isPathAbsolute = (routerArg) => {
  if (path.isAbsolute(routerArg)){
      return routerArg;
  } else {
      const routerAbs = convertToAbsolute(routerArg);
      return routerAbs;
  }
}


// Exp Regulares para el filtrado de los links en los archivos Markdown.
const expRegMarkdown = /.\.(m|M(?:d|D?markdown)?)|text$/g;


// Función que valida si es Carpeta y recorre sus archivos y filtra el .md y lo lee
const readPath = (routerArg) => {
    const arrayFile = [];
    if (fs.statSync(routerArg).isDirectory()) {
       const listFile = fs.readdirSync(routerArg);
       listFile.forEach(file => {
            const newPath = path.join(routerArg, file);
            const newRoute = fs.statSync(newPath);
            if (newRoute.isDirectory()) { // eliminar y poner directamente la recursividad
                readPath(newPath); //
            } else if (newRoute.isFile() && expRegMarkdown.test(file)) { //
                arrayFile.push(newPath);  // -------
            } //---------------
       });  
    } else if (fs.statSync(routerArg).isFile() && expRegMarkdown.test(path.basename(routerArg))) {
         arrayFile.push(routerArg);
    }   
    const pathFileMd = arrayFile.toString();
    return pathFileMd;   
}


exports.convertToAbsolute = convertToAbsolute;
exports.isPathAbsolute = isPathAbsolute;
exports.readPath = readPath;




