const fs = require('fs');
const fetch = require('node-fetch');

// Función que valida si es un archivo y filtra si es .md y lo lee
const readLinks = (arrayFileMD) => {
  const expRegLinks = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g;
  const expRegURL = /\((http|https|ftp|ftps).+?\)/g;
  const expRegNameURL = /\[.+?\]/g;
  return new Promise((resolve, reject) => {
    const dataLinks = [];
    arrayFileMD.forEach(fileMD => {
      const contentTotal = fs.readFileSync(fileMD).toString();
      const listLinks = contentTotal.match(expRegLinks);
      listLinks.forEach(link => {
        const newHref = link.match(expRegURL).toString();
        const newText = link.match(expRegNameURL).toString();
        dataLinks.push({
          file: fileMD,
          href: newHref.substring(1, newHref.length - 1),
          text: newText.substring(1, newText.length - 1),
        });
      });
    });
    resolve(dataLinks);
    reject(new Error('Error'));
  });
};

// Función --validate
const validateLinks = (arrayData) => {
  const arrayPromises = arrayData.map((url) => {
    const urlRef = fetch(url.href);
    return urlRef.then(res => ({
      file: url.file,
      href: url.href,
      text: url.text,
      status: `${res.status} --> ${res.statusText}`,
    }))
      .catch(error => ({
        file: url.file,
        href: url.href,
        text: url.text,
        status: 'Fail'
      }));
  });
  return Promise.all(arrayPromises);
};

exports.readLinks = readLinks;
exports.validateLinks = validateLinks;
