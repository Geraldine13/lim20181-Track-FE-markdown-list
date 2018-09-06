const optionsLinks = require('./optionsLinks.js');

const mdLinks = (path, options) => {
  const objTotalLinks = [];
  return new Promise((resolve, reject) => {
    if (options.validate && options.stats) {
      optionsLinks.readLinks(path)
        .then(result => {
          optionsLinks.validateLinks(result).then((objLinks) => {
            objLinks.forEach(links => {
              objTotalLinks.push(links.href)
            })
            const brokenLinks = objLinks.filter(link => {
              return link.status === 'Fail';
            })
            const resultTotal = `Total: ${objTotalLinks.length} \nUnique: ${[... new Set(objTotalLinks)].length} \nBroken: ${brokenLinks.length}`;
            resolve(resultTotal);
          })
        })
    } else if (options.validate) {
      optionsLinks.readLinks(path)
        .then(result => {
          optionsLinks.validateLinks(result)
            .then(responses => resolve(responses))
        })
    } else if (options.stats) {
      optionsLinks.readLinks(path)
        .then(result => {
          optionsLinks.validateLinks(result)
            .then((objLinks) => {
              objLinks.forEach(links => {
                objTotalLinks.push(links.href)
              })
              const resultTotalUnique = `Total: ${objTotalLinks.length} \nUnique: ${[... new Set(objTotalLinks)].length}`;
              resolve(resultTotalUnique);
            })
        })
    } else {
      reject('Hubo un error')
    }
  })
}

exports.mdLinks = mdLinks;
