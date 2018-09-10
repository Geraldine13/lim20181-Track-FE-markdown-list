const index = require('../src/index.js');
const path = 'test/prueba/Readme.md';

test('debería retornar un objeto con {total, unique} para option --stats', () => {
  const options = {
    validate: false,
    stats: true
  }
  return index.mdLinks(path, options)
    .then(response => {
      expect(response).toEqual({total: 5, unique: 4});
    });
}, 5000);

test('debería retornar un objeto con [{total, unique, broquen}] para options --validate y --stats', () => {
  const options = {
    validate: true,
    stats: true
  }
  return index.mdLinks(path, options)
    .then(response => {
      expect(response).toEqual({total: 5, unique: 4, broken: 1});
    });
});

test('debería retornar un array de objetos con [{href, text, file, status}] para option --validate', () => {
  const options = {
    validate: true,
    stats: false
  }
  return index.mdLinks(path, options)
    .then(response => {
      expect(response).toEqual(
        [ { file: 'test/prueba/Readme.md',
            href: 'https://www.laboratoria.la/',
            text: 'Laboratoria',
            status: '200 --> OK' },
          { file: 'test/prueba/Readme.md',
            href: 'https://www.crowdbotics.com/',
            text: 'Crowdbotics',
            status: '200 --> OK' },
          { file: 'test/prueba/Readme.md',
            href: 'https://en.wikipedia.org/wiki/Caesar_cipher',
            text: 'cifrado César',
            status: '200 --> OK' },
          { file: 'test/prueba/Readme.md',
            href: 'https://github.con/Galdine13',
            text: 'GitHub',
            status: 'Fail'},
          { file: 'test/prueba/Readme.md',
            href: 'https://www.laboratoria.la/',
            text: 'Laboratoria',
            status: '200 --> OK' } ]
      );
    });
}, 10000);