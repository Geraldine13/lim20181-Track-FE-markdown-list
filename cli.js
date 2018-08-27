#!/usr/bin/env node
const fs = require('fs');
const validations = require('./validations.js');
const optionsLinks = require('./optionsLinks.js')

// Argumentos ingresados por la línea de comando - options.
const [,, ...args] = process.argv;

// Capturando la ruta ingresada como argumento.
const directory = args.shift();

// Objeto de las opciones de la librería.
const options = {
    validate: false,
    stats: false,
}


switch (directory !== '') {
    case (directory === '--help'):
        index.instructions();
        break;
    case (fs.existsSync(directory)):
        const pathAbsolute = validations.isPathAbsolute(directory);
        const pathFileMd = validations.readPath(pathAbsolute);
        optionsLinks.readLinks(pathFileMd)
        .then((data) => {
            console.log(data);   
        })
        .catch((error) => {
            console.log(error);
        })
        break;
}



// switch (args[0] !== '') {
//     case (args[0] === '--validate'):
//         options.validate = true;
        

// }

// if (options.validate === true) {
//     optionsLinks.validate()
// }

// if (directory === '--help') { // ok
//     index.instructions();     // ok
// } else if (fs.existsSync(directory)) { // ok
//     const pathAbsolute = validations.isPathAbsolute(directory); // ok
//     const pathFileMd = validations.readPath(pathAbsolute); // ok
//     validations.readLinks(pathFileMd);
// } else {
//     console.log(`Ruta ingresada no existe.`);
//     console.log(pathFile);
// }


// switch (directory) {
//     case (directory === '--help'):
//         instructions();
//         console.log('eligió la opción de ayuda');
//         break;
//     // case (args.includes('--stats')):
//     //     options.stats = true;
//     //     console.log('eligió stats');
//     //     break;
//     // case (directory === '--help'):
        
        
//     //     break;
//     // default:
//     //     console.log('solicitó ayuda');
//     //     break;      
// }


// console.log(args);
// console.log(directory);
