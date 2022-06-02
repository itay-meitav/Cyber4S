let check = (matrix) => {
  let removeCol = [];
  let removeRow = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        removeCol.push(j);
        removeRow.push(i);
      }
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (removeRow.includes(i) || removeCol.includes(j)) {
        matrix[i][j] = 0;
      }
    }
  }
  return matrix;
};

module.exports = check;
