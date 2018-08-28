const fs = require('fs');
const fetch = require('node-fetch');
const rp = require ('request-promise');


// Exp Regulares para el filtrado de los links en los archivos Markdown.
const expRegLinks = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g;
const expRegURL = /\((http|https|ftp|ftps).+?\)/g;
const expRegNameURL = /\[.+?\]/g;

const dataLinks = [];

// Función que valida si es un archivo y filtra si es .md y lo lee
const readLinks = (routerFile) => {
    return new Promise((resolve, reject) => {
        
        const contentTotal = fs.readFileSync(routerFile).toString();
        const listLinks = contentTotal.match(expRegLinks);
        listLinks.forEach(link => {
            const newHref = link.match(expRegURL).toString();
            const newText = link.match(expRegNameURL).toString();
            dataLinks.push({
                file: routerFile,
                href: newHref.substring(1, newHref.length-1), 
                text: newText.substring(1, newText.length-1)
            })
        })
        resolve(
            dataLinks
        )
        reject('Error');
    })
}




const validateLinks = (data) => {
        const arrayPromises = data.map(url => {
            let urlRef = fetch(url.href);
            return urlRef.then((res) => {
                return ({
                    file: url.file,
                    href: url.href,
                    text: url.text,
                    status: `${res.status} --> ${res.statusText}`
                })
            })
            .catch(error => {
                return ({
                    file: url.file,
                    href: url.href,
                    text: url.text,
                    status: 'Error en conexión con el servidor'
                }) 
            })
        })
        
        Promise.all(arrayPromises)
            .then(responses => {
                console.log(responses);
                
            })
}

exports.readLinks = readLinks;
exports.validateLinks = validateLinks;