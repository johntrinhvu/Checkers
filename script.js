// John Vu
// 28 April 2023
// Checkers JS File

/* Constant Variables */
const PLAYERS = {
    "0": null,
    "1": {
        "name": "RED",
        "color": "#ff6961",
        "score": 12
        
    },

    "-1": {
        "name": "BLUE", // light red
        "color": "#0096FF", // light blue
        "score": 12

    },

    "draw": "#C4A484" // color for Draw

}

/* State Variables */
const board = [
    null, 0, null, 1, null, 2, null, 3, null, 4, null, 5, null, 6, null, 7, 
    null, 8, null, 9, null, 10, null, 11, null, 12, null, 13, null, 14, null, 15, 
    null, 16, null, 17, null, 18, null, 19, null, 20, null, 21, null, 22, null, 23, null 

]

let turn;
let score;
let winner;

/* Cached Elements */
const allSpaces = document.querySelectorAll("td");
const messageEl = document.querySelector("h1");
let redObjects = document.querySelectorAll("h2");
let blueObjects = document.querySelectorAll("h3");
const resetBoardBtn = document.querySelector("button");

/* Event Listeners */


/* Functions */
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
        messageEl.innerHTML = `<span style="color: ${PLAYERS[winner].color}">${PLAYERS[winner].name}</span> WINS!`
    
    } else {
        // Game is still in play
        messageEl.innerHTML = `<span style="color: ${PLAYERS[turn].color}">${PLAYERS[turn].name}</span>'s TURN`
    }

}

function renderControls() {
    resetBoardBtn.style.visibility = winner ? "visible" : "hidden";

}