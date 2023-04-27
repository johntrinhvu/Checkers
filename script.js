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

    // highlight piece
    highlightCurrentPiece(clickedPiece)

    // then highlight possible moves
    const possibleMoves = getPossibleMoves(currentCol, currentRow);
    // then can click on move

    possibleMoves.forEach(function(possibleMove) {
        possibleMove.addEventListener('click', movePiece);
        
    });
    
}

function highlightCurrentPiece(clickedPiece) {
    removeHighlights();

    // else if the piece is by the current player, it will add it to the css element
    if (clickedPiece.classList.contains(`${PLAYERS[turn].name}`)) {
        selectedPiece = clickedPiece;
        clickedPiece.classList.add("pieceSelected");
        
    }
}

function removeHighlights() {
    // if there alr is selected piece, remove from the color and set to null
    if (selectedPiece) {
        selectedPiece.classList.remove("pieceSelected");
        selectedPiece = null;

    }

    allHighlighted = document.querySelectorAll(".highlighted")
    allHighlighted.forEach(function(cell) {
        cell.classList.remove("highlighted");

    });
    
}

function getPossibleMoves(colIdx, rowIdx) {
    // Get current position of the piece that was clicked
    // what the player val is
    const currentPlayer = board[colIdx][rowIdx];
    
    const possibleMoves = [];

    // if a piece exists on the board
    if (currentPlayer !== 0) {
        const left = colIdx - 1;
        const right = colIdx + 1;
        let forward = null;
        
        // if the piece is the same color as current player's turn
        if (currentPlayer === turn) { // blue or red all turns
            forward = rowIdx + turn;
            if (left >= 0 && board[left][forward] === 0) {
                const cell = document.getElementById(`c${left}r${forward}`);
                cell.classList.add('highlighted');
                possibleMoves.push(cell);
    
            }
    
            if (right <= 7 && board[right][forward] === 0) {
                const cell = document.getElementById(`c${right}r${forward}`);
                cell.classList.add('highlighted');
                possibleMoves.push(cell);
                
            }
        }
    }
    return possibleMoves;
}

function movePiece(cell) {
    const moveToLocation = cell.target;

    // to move cell, move piece to another parent;
    moveToLocation.append(selectedPiece);
    removeHighlights();
    cells.forEach(function(cell) {
        cell.removeEventListener("click", movePiece);

    });

    // update board and change turn
    turn *= -1;

    // then render the board again
    render();

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