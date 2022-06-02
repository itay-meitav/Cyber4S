const check = require('./app');

it('"s" can become "goal" so return true', () => {
  expect(check("abc", "cab")).toBe(true);
});
