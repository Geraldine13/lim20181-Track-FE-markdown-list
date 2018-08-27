const fs = require('fs');
const fetch = require('node-fetch');


// Exp Regulares para el filtrado de los links en los archivos Markdown.
const expRegLinks = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g;
const expRegURL = /\((http|https|ftp|ftps).+?\)/g;
const expRegNameURL = /\[.+?\]/g;

const dataLinks = [];

const validate = (url) => {
    fetch(url)
        .then((response) => {
            
            if (response.ok) {
                dataLinks.push({status: ok});
            } else {
                dataLinks.push({status: fail})
            }
        })
        .catch((e) => {
            console.log('Problema con la petición:' + e.message);
        })
    return dataLinks;
}



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
            validate('dataLinks.href')
        })
        
        setTimeout(() => {
            resolve(
                dataLinks
            )
        }, 1000)
    })
}





exports.readLinks = readLinks;
//exports.validate = validate;