/*
We store our game status element here to allow us to more easily 
use it later on 
*/

const statusDisplay = document.querySelector('.game--status'); /* this line goes through the html doc (document.) and 'plays' with the content of game--status (querySelector()) */
let gameActive = true; /* this is what dictates if the game is on or not, it turns to false everytime anyone wins or draws */
let currentPlayer = "X"; 
let gameState = ["", "", "", "", "", "", "", "", ""]; /* this is all of the inputs in the tictactoe*/

const winningMessage = () => `Player ${currentPlayer} has won!`;  /* all of these are arrow functions, they basically make writing functions faster (if they are smol) */
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/*
We set the inital message to let the players know whose turn it is
*/

statusDisplay.innerHTML = currentPlayerTurn();

/* all of these function dont do anything special, they just here to kinda show how the program works */

function handleCellPlayed() {

}
function handlePlayerChange() {

}
function handleResultValidation() {

}
function handleCellClick() {

}
function handleRestartGame() {

}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)); /* this basically handles what happens when you click on one of the boxes to play */
document.querySelector('.game--restart').addEventListener('click', handleRestartGame); /* this just uses the function handleRestartGame when you perss on the button restart game */

function handleCellClick(clickedCellEvent) { /* this is whta happens when u click on a cell*/
    /*
    We will save the clicked html element in a variable for easier further use, clickedCellEvent lowkey just tells you if you clicked or not, and .target tells you exactly waht you clicked on
    */   
        const clickedCell = clickedCellEvent.target;
    /*
    Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
    Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
    integer(number)
    */
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );
    /* 
    Next up we need to check whether the call has already been played, 
    or if the game is paused. If either of those is true we will simply ignore the click.
    */
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
    /* 
    If everything if in order we will proceed with the game flow
    */    
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }


    function handleCellPlayed(clickedCell, clickedCellIndex) {
        /*
        We update our internal game state to reflect the played move, 
        as well as update the user interface to reflect the played move
        */
            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;
        }


        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break
                }
            }
        if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                return;
            }
        
/* 
We will check weather there are any values in our game state array 
that are still not populated with a player sign
*/
let roundDraw = !gameState.includes("");
if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
}
/*
If we get to here we know that the no one won the game yet, 
and that there are still moves to be played, so we continue by changing the current player.
*/
handlePlayerChange();
}      

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}