const gameBoard = document.querySelector('.game-board');
const cellsArray = document.querySelectorAll('.cell');
console.log(gameBoard);
console.log(cellsArray);

const boardWidth = 5;
const initPosition = 0;

// Tetros
const lTetro = [0,0+boardWidth, (0+boardWidth)*2, (0+boardWidth)*2+1];