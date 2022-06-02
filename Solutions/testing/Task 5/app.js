let check = (s, goal) => {
  function shift() {
    let first = s.charAt(0);
    s = s + first;
    s = s.slice(1);
  }
  for (let i = 0; i < 10; i++) {
    if (s === goal) {
      return true;
    } else {
      shift();
    }
  }
  return false;
};

module.exports = check;
