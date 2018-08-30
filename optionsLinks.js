const fs = require('fs');
const fetch = require('node-fetch');
const rp = require ('request-promise');


// Exp Regulares para el filtrado de los links en los archivos Markdown.
const expRegLinks = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g;
const expRegURL = /\((http|https|ftp|ftps).+?\)/g;
const expRegNameURL = /\[.+?\]/g;


// Función que valida si es un archivo y filtra si es .md y lo lee
const readLinks = (routerFile) => {
    return new Promise((resolve, reject) => {
        const dataLinks = [];
        const result = '';
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
        resolve(dataLinks)            
        reject('Error')
    })
}

let broken = 0;


// Función --validate
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
                    status: 'Fail'
                })

            })
        })

        Promise.all(arrayPromises)
            .then(responses => {
                console.log(responses);
                const statusLink = responses.filter(link => {
                    return link.status === 'Fail';
                })
                
                console.log(broken = statusLink.length);
                
            })
}


// // Función para validar status
// const status = (data) => {
//     const arrayPromises = data.map(url => {
//         let urlRef = fetch(url.href);
//         return urlRef.then((res) => {
//             return ({
//                 file: url.file,
//                 href: url.href,
//                 text: url.text,
//                 status: `${res.status} --> ${res.statusText}`
//             })
//         })
//         .catch(error => {
//             return ({
//                 file: url.file,
//                 href: url.href,
//                 text: url.text,
//                 status: 'Fail'
//             })

//         })
//     })
    
   

//     console.log(broken);
    
//     Promise.all(arrayPromises)
//         .then(responses => {
//             console.log(responses);
//         })
// }


// Función --stats
const statsLinks = (routerFile) => {
    return new Promise((resolve, reject) => {
        const contentTotal = fs.readFileSync(routerFile).toString();
        const listLinks = contentTotal.match(expRegLinks);
        resolve ([{Total:listLinks.length, Unique: [... new Set(listLinks)].length}])
        reject('Error')
    })
}


// Función de filtrado de archivos Markdown.
const filterStatusFail = (array) => {
    const filterLink = array.filter((link) => {
        console.log(link);
        
         return link.status === 'Fail';
    })
    return filterLink;
}


// Función --validate && --stats
const validateAndStats = (routerFile, data) => {
    statsLinks(routerFile);
    const dataStatus = validateLinks(data);
    if (dataStatus.status === 'Fail'){
        broken++
    }
    console.log(`Broken: ${broken.length}`);
}





exports.readLinks = readLinks;
exports.validateLinks = validateLinks;
exports.statsLinks = statsLinks;
exports.validateAndStats = validateAndStats;