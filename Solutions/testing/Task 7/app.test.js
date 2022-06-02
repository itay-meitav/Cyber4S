const check = require('./app');

it('if an element is 0, set its entire row and column to 0', () => {
  expect(check([[0,1,2,0],[3,4,5,2],[1,3,1,5]])).toEqual([[0,0,0,0],[0,4,5,0],[0,3,1,0]]);
});
