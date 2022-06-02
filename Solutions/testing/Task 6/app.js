let check = (string) => {
  for (let i = 0; i < string.length; i++) {
    let letter = string.charAt(i);
    if (string.indexOf(letter) == i && string.indexOf(letter, i + 1) == -1) {
      return string.indexOf(letter);
    }
  }
  return -1;
};

module.exports = check;
