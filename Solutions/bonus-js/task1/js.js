function checkPassed(grade) {
  grade > 56 ? console.log(passed) : console.log(failed);
}

const increment = (function () {
  let counter = 2;
  return function () {
    counter = counter ** 2;
    return counter;
  };
})();

console.log(increment());
