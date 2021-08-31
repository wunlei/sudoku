module.exports = function solveSudoku(matrix) {
  let size = matrix[1].length;
  let currentRow;
  let currentCol;

  function findZero(matrix) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j] === 0) {
          currentRow = i;
          currentCol = j;
          return true;
        }
      }
    }
    return false;
  }

  function isNumValid(matrix, num) {
    const startRow = currentRow - (currentRow % Math.sqrt(size));
    const startCol = currentCol - (currentCol % Math.sqrt(size));
    for (let i = 0; i < size; i++) {
      if (matrix[currentRow][i] === num && i != currentCol) {
        return false;
      }
    }

    for (let i = 0; i < size; i++) {
      if (matrix[i][currentCol] === num && i != currentRow) {
        return false;
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          matrix[startRow + i][startCol + j] === num &&
          i != currentRow &&
          j != currentCol
        ) {
          return false;
        }
      }
    }
    return true;
  }

  function checkNumber(matrix) {
    if (findZero(matrix)) {
      let [prevRow, prevCol] = [currentRow, currentCol];

      for (let i = 1; i <= size; i++) {
        let num = i;
        if (isNumValid(matrix, num)) {
          matrix[currentRow][currentCol] = i;
          if (checkNumber(matrix)) {
            return true;
          }
          [currentRow, currentCol] = [prevRow, prevCol];
          matrix[prevRow][prevCol] = 0;
        }
      }
      return false;
    }
    return true;
  }

  checkNumber(matrix);
  return matrix;
};
