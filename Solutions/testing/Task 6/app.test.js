const check = require('./app');

it('find the first non-repeating character in it and return its index', () => {
  expect(check("aabbccdd")).toBe(-1);
});
