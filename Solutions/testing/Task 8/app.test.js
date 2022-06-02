const check = require('./app');

it('Rotate the image by 90 degrees', () => {
  expect(check([[1,2,3],[4,5,6],[7,8,9]])).toEqual([[7,4,1],[8,5,2],[9,6,3]]);
});
