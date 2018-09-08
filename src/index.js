const optionsLinks = require('./optionsLinks.js');

const mdLinks = (path, options) => {
  const resultFinal = {};
  const objTotalLinks = [];
  return new Promise((resolve, reject) => {
    if (options.validate && options.stats) {
      optionsLinks.readLinks(path)
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
      optionsLinks.readLinks(path)
        .then((result) => {
          optionsLinks.validateLinks(result)
            .then(responses => resolve(responses));
        });
    } else if (options.stats) {
      optionsLinks.readLinks(path)
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

exports.mdLinks = mdLinks;
