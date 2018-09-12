const fs = require('fs');
const optionsLinks = require('./optionsLinks.js');
const validations = require('./validations.js');

const mdLinks = (path, options) => {
  const resultFinal = {};
  const objTotalLinks = [];
  if (fs.existsSync(path)) {
    const pathAbsolute = validations.isPathAbsolute(path);
    const arraypathFileMd = validations.readPath(pathAbsolute);
    return new Promise((resolve, reject) => {
      if (!options.validate && !options.stats) {
        resolve(optionsLinks.readLinks(arraypathFileMd));
      } else if (options.validate && options.stats) {
        optionsLinks.readLinks(arraypathFileMd)
          .then((result) => {
            optionsLinks.validateLinks(result).then((objLinks) => {
              const brokenLinks = objLinks.filter(link => link.status === 'Fail');
              objLinks.forEach((links) => {
                objTotalLinks.push(links.href);
              });
              resultFinal.total = objTotalLinks.length; 
              resultFinal.unique = [...new Set(objTotalLinks)].length;
              resultFinal.broken = brokenLinks.length;
              resolve(resultFinal);
            });
          });
      } else if (options.validate) {
        optionsLinks.readLinks(arraypathFileMd)
          .then((result) => {
            optionsLinks.validateLinks(result)
              .then(responses => resolve(responses));
          });
      } else if (options.stats) {
        optionsLinks.readLinks(arraypathFileMd)
          .then((result) => {
            optionsLinks.validateLinks(result)
              .then((objLinks) => {
                objLinks.forEach((links) => {
                  objTotalLinks.push(links.href);
                });
                resultFinal.total = objTotalLinks.length; 
                resultFinal.unique = [...new Set(objTotalLinks)].length;
                resolve(resultFinal);
              });
          });
      } else {
        reject(new Error('Hubo un error'));
      }
    });
  };  
};

module.exports = mdLinks;
