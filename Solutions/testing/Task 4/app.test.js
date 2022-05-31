const check = require('./app');

it('if any value appears at least twice return true', () => {
  expect(check([1,2,2,3])).toBe(true);
});
