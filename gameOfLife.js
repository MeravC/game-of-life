const clear = require('clear')
const chalk = require('chalk');

const rows = 30;
const columns = 30;
let board = createNewGame();


setInterval(() => {
    clear();
    play();
  }, 500)

function play(){

    const boardAfterTurn = [];

    for(var i=0; i<rows; i++) {
        boardAfterTurn[i] = new Array(columns);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            boardAfterTurn[i][j] = deadOrAlive(i,j,board);
        }
    }
    printBoard(boardAfterTurn);
    board = boardAfterTurn;
}

function createNewGame(){
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(columns);
        for (let j = 0; j < columns; j++) {
            board[i][j] = Math.round(Math.random());
            
        }
    }
    return board;
}

function deadOrAlive(i, j, board){
    let aliveNeighb = checkTheNeighbors(i,j,board);
    if (board[i][j] === 1 && (aliveNeighb === 2 || aliveNeighb === 3)){
        return 1;
    }
    else if (board[i][j] === 0 && aliveNeighb === 3){
        return 1;
    }
    else{
        return 0;
}

function checkTheNeighbors(i,j,board){
    let count = 0;
    if (i-1 >= 0) {
        if (board[i-1][j] === 1) count++;
    }
    if (i-1 >= 0 && j-1 >= 0) {
        if (board[i-1][j-1] === 1) count++;
    }
    if (i-1 >= 0 && j+1 < columns) {
        if (board[i-1][j+1] === 1) count++;
    }
    if (j-1 >= 0) {
        if (board[i][j-1] === 1) count++;
    }
    if (j+1 < columns) {
        if (board[i][j+1] === 1) count++;
    }
    if (i+1 < rows) {
        if (board[i+1][j] === 1) count++;
    }
    if (i+1 < rows && j-1 >= 0) {
        if (board[i+1][j-1] === 1) count++;
    }
    if (i+1 < rows && j+1 < columns) {
        if (board[i+1][j+1] === 1) count++;
    }
    return count;
}

function printBoard(boardAfterTurn){
    let boardString = ''
    for (let row of boardAfterTurn) {
        for (let cell of row) {
            boardString += (cell === 0) ? '   ' : chalk.bgWhite('   ');
        }
        boardString += '\n';
    }
  console.log(boardString);
}
