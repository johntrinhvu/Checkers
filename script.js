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
let board; // an array of arrays of 8x8 - 64 total spaces
let winner; // winner has to be blue or red, T for draw

/* Cached Elements */
const messageEl = document.querySelector("h1");
let selectedPiece; // current selected piece
const resetBoardBtn = document.querySelector("button");
let htmlBoard = document.getElementById("board");
const originalBoardStateHTML = htmlBoard.innerHTML;
let cells;


// reset board
resetBoardBtn.addEventListener("click", resetGame);

// call init
init();

/* Functions */
function init() {
    /* Local Scope Cached Elements */
    cells = document.querySelectorAll("div");
    let redPieces = document.querySelectorAll("h3");
    let bluePieces = document.querySelectorAll("h4");
    
    /* Event Listeners */
    redPieces.forEach(function (redPiece) {
        redPiece.addEventListener('click', handleMove);
    
    
    });
    
    bluePieces.forEach(function (bluePiece) {
        bluePiece.addEventListener('click', handleMove);
    
    });
    
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
    selectedPiece = null;
    render();

}

function handleMove(evt) {
    // Get the current position of the clicked piece
    const clickedPiece = evt.target;
    let currentPos = clickedPiece.parentElement.id;
    let currentCol = parseInt(currentPos[1]);
    let currentRow = parseInt(currentPos[3]);

    // highlight piece
    highlightCurrentPiece(clickedPiece)

    // then highlight possible moves
    const possibleMoves = getPossibleMoves(currentCol, currentRow);
    // then can click on move

    possibleMoves.forEach(function (possibleMove) {
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
    allHighlighted.forEach(function (cell) {
        cell.classList.remove("highlighted");
        cell.style.cursor = "default";

    });
}

function getPossibleMoves(colIdx, rowIdx) {
    // Get current position of the piece that was clicked
    // what the player val is
    const currentPlayer = board[colIdx][rowIdx];

    // make an array for all possible moves
    const possibleMoves = [];

    // if a piece exists on that specific cell
    if (currentPlayer !== 0) {
        const left = colIdx - 1;
        const right = colIdx + 1;
        const leftCapture = left - 1;
        const rightCapture = right + 1;
        const oppositePlayer = turn * -1;
        let forward = null;
        let forwardCapture = null;

        // if the piece is the same color as current player's turn
        if (currentPlayer === turn) { // blue or red all turns
            forward = rowIdx + turn;
            forwardCapture = forward + turn;

            // moving adjacent left up
            if (left >= 0 && board[left][forward] === 0) {
                const cell = document.getElementById(`c${left}r${forward}`);
                cell.classList.add('highlighted');
                cell.style.cursor = "pointer";
                possibleMoves.push(cell);
                
            // capture piece left 2 up 2
            } else if (leftCapture >= 0 && board[leftCapture][forwardCapture] === 0 && board[left][forward] === oppositePlayer) {
                const cell = document.getElementById(`c${leftCapture}r${forwardCapture}`);
                cell.classList.add('highlighted');
                cell.style.cursor = "pointer";
                possibleMoves.push(cell);
                
            }
            
            // moving adjacent right up
            if (right <= 7 && board[right][forward] === 0) {
                const cell = document.getElementById(`c${right}r${forward}`);
                cell.classList.add('highlighted');
                cell.style.cursor = "pointer";
                possibleMoves.push(cell);
                
            // capture piece right 2 up 2
            } else if (rightCapture <= 7 && board[rightCapture][forwardCapture] === 0 && board[right][forward] === oppositePlayer) {
                const cell = document.getElementById(`c${rightCapture}r${forwardCapture}`);
                cell.classList.add('highlighted');
                cell.style.cursor = "pointer";
                possibleMoves.push(cell);

            }
        }
        return possibleMoves;

    }
}

function movePiece(cell) {
    const moveToLocation = cell.target;
    const oldPos = selectedPiece.parentElement.id;
    const oldCol = parseInt(oldPos[1]);
    const oldRow = parseInt(oldPos[3]);
    const oppositePlayer = turn * -1

    // to move cell, move piece to another parent;
    moveToLocation.append(selectedPiece);

    // then remove highlights on the board
    removeHighlights();

    // then remove the eventListener to click the piece
    cells.forEach(function (cell) {
        cell.removeEventListener("click", movePiece);

    });

    // update board and change turn
    const newPos = moveToLocation.id;
    const newCol = parseInt(newPos[1]);
    const newRow = parseInt(newPos[3]);
    const colDiff = Math.abs(newCol - oldCol);
    const rowDiff = Math.abs(newRow - oldRow);

    // capture a piece if the movement is > 1: newColumn - oldColumn = 2 and newRow - oldRow = 2
    if (colDiff === 2 && rowDiff === 2) {
        const capturedCol = (newCol + oldCol) / 2;
        const capturedRow = (newRow + oldRow) / 2;
        const capturedCell = document.getElementById(`c${capturedCol}r${capturedRow}`);
        const childOfCapturedCell = capturedCell.children[0];
        
        // now remove the piece
        capturedCell.removeChild(childOfCapturedCell);

        // update board
        board[capturedCol][capturedRow] = 0;

        // now update the score
        PLAYERS[oppositePlayer].score -= 1;
        
        // console log the score testing; do not need to put the scoreboard on the page
        console.log(`${PLAYERS[oppositePlayer].name.toUpperCase()}: ${PLAYERS[oppositePlayer].score} pieces left.`)
        
    }

    // change old cell to empty
    board[oldCol][oldRow] = 0;

    // change new cell to the piece
    board[newCol][newRow] = turn;

    // check score if 0 we have winner
    if (PLAYERS[oppositePlayer].score === 0) {
        winner = turn;
        
    }

    // change turn to next player
    turn *= -1;
    
    // then render the board again
    render();

}

function resetGame() {
    // Reset board state variables
    htmlBoard.innerHTML = originalBoardStateHTML;

    // call init again to reset the board data
    init();

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
    // set reset board to invisible until there is a winner
    resetBoardBtn.style.visibility = winner ? "visible" : "hidden";

}
