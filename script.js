// John Vu
// 28 April 2023
// Checkers JS File

/* Constant Variables */
const PLAYERS = {
    "1": {
        "name": "blue", 
        "color": "#0096FF", // light blue
        "score": 12,
        "identity": 1

    },
    "-1": {
        "name": "red",
        "color": "#ff6961", // light red
        "score": 12,
        "id": -1
        
    },
    "draw": "#C4A484", // color for Draw
    "selected": "#bdbd87"

}

/* State Variables */
let turn; // either 1 (blue) or -1 (red)
let score; // 12 pieces on each side
let board; // an array of arrays of 8x8 - 64 total spaces
let winner; // wiiner has to be blue or red, T for draw

/* Cached Elements */
const cells = document.querySelectorAll("div");
const messageEl = document.querySelector("h1");
let redPieces = document.querySelectorAll("h3");
let bluePieces = document.querySelectorAll("h4");
let selectedPiece; // current selected piece
const resetBoardBtn = document.querySelector("button");

/* Event Listeners */
redPieces.forEach(function(redPiece) {
    redPiece.addEventListener('click', handleMove);
    
  
});

bluePieces.forEach(function(bluePiece) {
    bluePiece.addEventListener('click', handleMove);
  
});

// call init
init();

/* Functions */
function init() {

    // to visualize the board's mapping to the DOM, rotate 90 degrees counter-clockwise
    board = [
        [1, 0, 1, 0, 0, 0, -1, 0], // col 0
        [0, 1, 0, 0, 0, -1, 0, -1], // col 1
        [1, 0, 1, 0, 0, 0, -1, 0], // col 2
        [0, 1, 0, 0, 0, -1, 0, -1], // col 3
        [1, 0, 1, 0, 0, 0, -1, 0], // col 4
        [0, 1, 0, 0, 0, -1, 0, -1], // col 5
        [1, 0, 1, 0, 0, 0, -1, 0], // col 6
        [0, 1, 0, 0, 0, -1, 0, -1], // col 7

    ];

    turn = 1;
    winner = null;
    render();
    
}

function handleMove(piece) {
    // Get the current position of the clicked piece
    const clickedPiece = piece.target;
    let currentPos = clickedPiece.parentElement.id;
    let currentCol = parseInt(currentPos[1]);
    let currentRow = parseInt(currentPos[3]);

    console.log(currentPos, currentCol, currentRow);

    // if there alr is selected piece, remove from the color and set to null
    if (selectedPiece) {
        selectedPiece.classList.remove("pieceSelected");
        selectedPiece = null;

    }

    // else if the piece is by the current player, it will add it to the css element
    if (clickedPiece.classList.contains(`${PLAYERS[turn].name}`)) {
        selectedPiece = clickedPiece;
        clickedPiece.classList.add("pieceSelected");
        
    }

    // then highlight possible moves
    highlightPossibleMoves(currentCol, currentRow)
    


}

function highlightPossibleMoves(colIdx, rowIdx) {
    // Get current position of the piece that was clicked
    // what the player val is
    const currentCell = board[colIdx][rowIdx];
    const board_size = board.length * board.length;

    if (currentCell !== 0) {
        

    }
    
}

function isDiagonalCellEmpty(board, currentRow, currentCol, directionRow, directionCol) {
    // Get the diagonal row and column
    const diagonalRow = currentRow + directionRow;
    const diagonalCol = currentCol + directionCol;
    
    // Check if the diagonal cell is within the board bounds
    if (diagonalRow < 0 || diagonalRow >= board.length || diagonalCol < 0 || diagonalCol >= board[0].length) {
      return false;
    }
    
    // Check if the diagonal cell is empty
    return board[diagonalRow][diagonalCol] === null;
  }

function highlightCell(colIdx, rowIdx) {
    const cell = document.getElementById(`c${colIdx}r${rowIdx}`);
    cell.classList.add('highlighted');

  }

function render() {
    renderMessage();
    renderControls();

}

function renderMessage() {
    // if tie
    if (winner === "T") {
        messageEl.innerHTML = `<span style="color: ${PLAYERS.draw}">DRAW</span>`
    
    
    } else if (winner) {
        // we have winner
        messageEl.innerHTML = `<span style="color: ${PLAYERS[winner].color}">${PLAYERS[winner].name.toUpperCase()}</span> WINS!`
    
    } else {
        // Game is still in play
        messageEl.innerHTML = `<span style="color: ${PLAYERS[turn].color}">${PLAYERS[turn].name.toUpperCase()}</span>'s TURN`
    }

}

function renderControls() {
    resetBoardBtn.style.visibility = winner ? "visible" : "hidden";

}