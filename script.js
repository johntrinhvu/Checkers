// John Vu
// 28 April 2023
// Checkers JS File

/* Constant Variables */
const PLAYERS = {
    "0": null,
    "1": {
        "name": "BLUE", 
        "color": "#0096FF", // light blue
        "score": 12,
        "identity": 1

    },
    "-1": {
        "name": "RED",
        "color": "#ff6961", // light red
        "score": 12,
        "id": -1
        
    },
    "draw": "#C4A484" // color for Draw

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
const resetBoardBtn = document.querySelector("button");

/* Event Listeners */


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

function render() {
    // renderBoard();
    renderMessage();
    renderControls();

}


function renderMessage() {
    // if tie
    if (winner === "T") {
        messageEl.innerHTML = `<span style="color: ${PLAYERS.draw}">DRAW</span>`
    
    
    } else if (winner) {
        // we have winner
        messageEl.innerHTML = `<span style="color: ${PLAYERS[winner].color}">${PLAYERS[winner].name}</span> WINS!`
    
    } else {
        // Game is still in play
        messageEl.innerHTML = `<span style="color: ${PLAYERS[turn].color}">${PLAYERS[turn].name}</span>'s TURN`
    }

}

function renderControls() {
    resetBoardBtn.style.visibility = winner ? "visible" : "hidden";

}