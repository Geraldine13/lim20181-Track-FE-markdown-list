const mdLinks = require('./src/index.js');

test('debería retornar un arreglo de objeto con [{total, unique}] para option --stats', () => {
    expect.assertions(1);
    return fetchData().then(data => {
      expect(data).toBe('peanut butter');
    });
  });