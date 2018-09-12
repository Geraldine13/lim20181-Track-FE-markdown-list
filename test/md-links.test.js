const mdLinks = require('../src/index.js');

test('debería retornar un array de objetos con [{file, href, text, status}] para option --validate', () => {
  return mdLinks('test/prueba', {validate: true, stats: false})
    .then(response => {      
      expect(response).toEqual(
        [ { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://www.laboratoria.la/',
            text: 'Laboratoria',
            status: '200 --> OK' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://www.crowdbotics.com/',
            text: 'Crowdbotics',
            status: '200 --> OK' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://en.wikipedia.org/wiki/Caesar_cipher',
            text: 'cifrado César',
            status: '200 --> OK' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://github.con/Galdine13',
            text: 'GitHub',
            status: 'Fail' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://www.laboratoria.la/',
            text: 'Laboratoria',
            status: '200 --> OK' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://www.google.com',
            text: 'Google',
            status: '200 --> OK' } ]
      );
    });
});

test('debería retornar un array de objetos con [{file, href, text}] cuando se pase sólo la ruta como argumento', () => {
  return mdLinks('test/prueba', {validate: false, stats: false})
    .then(response => {
      expect(response).toEqual(
        [ { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://www.laboratoria.la/',
            text: 'Laboratoria' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://www.crowdbotics.com/',
            text: 'Crowdbotics' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://en.wikipedia.org/wiki/Caesar_cipher',
            text: 'cifrado César' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://github.con/Galdine13',
            text: 'GitHub' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://www.laboratoria.la/',
            text: 'Laboratoria' },
          { file: 'C:\\Users\\GeraldineSaco\\Documents\\lim20181-Track-FE-markdown-list\\test\\prueba\\Readme.md',
            href: 'https://www.google.com',
            text: 'Google' } ]
        );
    });
}); 

test('debería retornar un objeto con {total, unique} para option --stats', () => {
  return mdLinks('test/prueba', {validate: false, stats: true})
    .then(response => {
      expect(response).toEqual({total: 6, unique: 5});
    });
});

test('debería retornar un objeto con [{total, unique, broquen}] para options --validate y --stats', () => {
  return mdLinks('test/prueba', {validate: true, stats: true})
    .then(response => {
      expect(response).toEqual({total: 6, unique: 5, broken: 1});
    });
});




