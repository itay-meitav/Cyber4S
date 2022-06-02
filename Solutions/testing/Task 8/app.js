let check = (matrix) => {
  for (let row = 0; row < matrix.length; row++) {
      for (let col = row; col < matrix[0].length; col++) {
          [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]]
      }
  }
  for (let row of matrix) {
      row.reverse();
  }
  return matrix;
}

module.exports = check;